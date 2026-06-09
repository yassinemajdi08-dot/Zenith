const { Client, GatewayIntentBits } = require("discord.js");
const { loadModel } = require("./ai/model");
const checkVideo = require("./ai/videoCheck");
const { checkImage } = require("./ai/model");

const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🧠 منع الضغط (مهم لمنع الكراش)
let processing = false;

// 🚀 تشغيل البوت
client.once("ready", async () => {
  console.log("Bot ready");
  await loadModel();
});

// 📥 استقبال الرسائل
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // 🔴 Lock system
  if (processing) return;
  processing = true;

  try {
    for (const file of message.attachments.values()) {

      const url = file.url;
      const type = file.contentType || "";

      const tempPath = path.join(__dirname, "temp_" + Date.now());

      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      // 🎥 فيديو
      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      }

      // 🖼️ صورة
      else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      if (score >= 0.6) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Error:", err.message);
  }

  // 🔓 فتح القفل
  processing = false;
});

client.login(process.env.TOKEN);    try {
      // تحميل الملف
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      // 🎥 إذا فيديو
      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      }

      // 🖼️ صورة / sticker / emoji
      else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("NSFW Score:", score);

      // 🚫 قرار الحذف
      if (score >= THRESHOLD) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

    } catch (err) {
      console.log("Error processing media:", err.message);
    } finally {
      // 🧹 تنظيف الملف المؤقت
      fs.unlink(tempPath, () => {});
    }
  }
});

// 🔐 تشغيل البوت
client.login(process.env.TOKEN);
      if (score >= THRESHOLD) {
        await message.delete().catch(() => {});
      }

    } catch (err) {
      console.log("Error:", err.message);
    }
  }
});

client.login(process.env.TOKEN);
client.login(process.env.TOKEN);

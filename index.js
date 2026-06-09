const { Client, GatewayIntentBits } = require("discord.js");
const { loadModel, checkImage } = require("./ai/model");
const checkVideo = require("./ai/videoCheck");

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

const THRESHOLD = 0.6;

// 🧠 تحميل AI عند التشغيل
client.once("ready", async () => {
  console.log("Bot ready");
  await loadModel();
});

// 📥 فحص الرسائل
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  for (const file of message.attachments.values()) {

    const url = file.url;
    const type = file.contentType || "";

    // ملف مؤقت
    const tempPath = path.join(__dirname, "temp_" + Date.now());

    try {
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

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

let processing = false;

// 🚀 تشغيل البوت
client.once("ready", async () => {
  console.log("Bot ready");

  try {
    await loadModel();
  } catch (err) {
    console.log("AI load error:", err.message);
  }
});

// 📥 الرسائل
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

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

      if (type.includes("video")) {
        console.log("Video detected");
        score = await checkVideo(tempPath);
      } else {
        console.log("Image detected");
        score = await checkImage(tempPath);
      }

      console.log("Score:", score);

      if (score >= 0.45) {
        await message.delete().catch(() => {});
        console.log("Message deleted");
      }

      fs.unlinkSync(tempPath);
    }

  } catch (err) {
    console.log("Runtime error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);  return Math.min(score, 1);
}

module.exports = {
  loadModel,
  checkImage
};

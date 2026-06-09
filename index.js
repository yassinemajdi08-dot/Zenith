const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let model;

// 🔥 تحميل الموديل
async function loadModel() {
  if (!model) {
    model = await nsfw.load();
    console.log("NSFW Model Loaded");
  }
}

// 🔥 فحص الصورة
async function checkImage(url) {
  const res = await fetch(url);
  const buffer = await res.buffer();

  const image = await tf.node.decodeImage(buffer, 3);
  const predictions = await model.classify(image);

  image.dispose();

  let score = 0;

  for (const p of predictions) {
    if (["Porn", "Hentai", "Sexy"].includes(p.className)) {
      score += p.probability;
    }
  }

  return score;
}

client.once("ready", async () => {
  console.log("ZENITH ONLINE");
  await loadModel();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    for (const file of message.attachments.values()) {
      const type = file.contentType || "";

      // 🖼️ فقط الصور + gif + stickers
      if (
        type.includes("image") ||
        type.includes("gif") ||
        type.includes("webp")
      ) {
        const score = await checkImage(file.url);

        console.log("Image score:", score);

        if (score >= 0.5) {
          await message.delete().catch(() => {});
          console.log("Deleted unsafe image");
        }
      }
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
});

client.login(process.env.TOKEN);

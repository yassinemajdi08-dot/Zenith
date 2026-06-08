const { Client, GatewayIntentBits } = require("discord.js");
const { loadModel, checkImage } = require("./ai/model");
const fetch = require("node-fetch");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const THRESHOLD = 0.6;

client.on("ready", async () => {
  console.log("Zenith is ready");
  await loadModel();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  for (const file of message.attachments.values()) {

    const url = file.url;
    const path = "./temp_" + Date.now();

    try {
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path, buffer);

      const score = await checkImage(path);

      console.log("NSFW Score:", score);

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

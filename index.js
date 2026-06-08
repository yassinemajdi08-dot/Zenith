const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const NSFW_THRESHOLD = 0.6;

client.on("ready", () => {
  console.log("Bot is ready!");
});

// 🔴 هذا “فحص بسيط مبدئي”
function fakeAIscore() {
  return Math.random(); // لاحقًا نستبدله بـ AI حقيقي
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  for (const attachment of message.attachments.values()) {

    const score = fakeAIscore();

    console.log("Score:", score);

    if (score > NSFW_THRESHOLD) {
      await message.delete().catch(() => {});
      console.log("Message deleted");
    }
  }
});

client.login(process.env.TOKEN);

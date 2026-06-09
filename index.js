const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// كلمات ممنوعة (نازية + إساءة)
const BLOCK_WORDS = [
  "nazi",
  "hitler",
  "swastika",
  "heil"
];

function isBlockedText(text) {
  if (!text) return false;
  text = text.toLowerCase();
  return BLOCK_WORDS.some(w => text.includes(w));
}

client.once("ready", () => {
  console.log("ZENITH BOT ONLINE");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    // 🔴 فحص النص
    if (isBlockedText(message.content)) {
      await message.delete().catch(() => {});
      console.log("Deleted text content");
      return;
    }

    // 🔴 فحص الملفات (صور / فيديو / gif / stickers)
    for (const file of message.attachments.values()) {
      const type = file.contentType || "";

      // صور + GIF + Stickers
      if (
        type.includes("image") ||
        type.includes("gif") ||
        type.includes("webp")
      ) {
        console.log("Media detected (image/gif/sticker)");
        // هنا لاحقًا نضيف AI NSFW إذا تريد
      }

      // فيديو
      else if (type.includes("video")) {
        console.log("Video detected");
        // لاحقًا نضيف frame analysis
      }

      else {
        console.log("Other file ignored");
      }
    }

  } catch (err) {
    console.log("Error:", err.message);
  }
});

client.login(process.env.TOKEN);

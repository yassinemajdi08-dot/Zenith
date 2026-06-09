const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const NAZI_WORDS = ["nazi", "hitler", "swastika"];

client.once("ready", () => {
  console.log("Bot is online");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase();

  if (NAZI_WORDS.some(w => text.includes(w))) {
    await message.delete().catch(() => {});
    console.log("Deleted Nazi content");
  }
});

client.login(process.env.TOKEN);
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(tempPath, buffer);

      let score = 0;

      if (type.includes("video")) {
        score = await checkVideo(tempPath);
      } else {
        score = await checkImage(tempPath);
      }

      if (score >= 0.45) {
        await message.delete().catch(() => {});
      }

      fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.log("Error:", err.message);
  }

  processing = false;
});

client.login(process.env.TOKEN);

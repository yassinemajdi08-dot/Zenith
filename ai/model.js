const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const fetch = require("node-fetch");

let model;

async function loadModel() {
  if (!model) {
    model = await nsfw.load();
    console.log("AI Model Loaded");
  }
}

async function checkImage(url) {
  const res = await fetch(url);
  const buffer = await res.buffer();

  const image = await tf.node.decodeImage(buffer, 3);
  const predictions = await model.classify(image);

  image.dispose();

  let score = 0;

  predictions.forEach(p => {
    if (
      p.className === "Porn" ||
      p.className === "Hentai" ||
      p.className === "Sexy"
    ) {
      score += p.probability;
    }
  });

  return Math.min(score, 1);
}

module.exports = {
  loadModel,
  checkImage
};  return Math.min(score, 1);
}

module.exports = {
  loadModel,
  checkImage
};
module.exports = {
  loadModel,
  checkImage
};  try {
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

client.login(process.env.TOKEN);  try {
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

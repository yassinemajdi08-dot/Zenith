const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const fetch = require("node-fetch");

let model;

// 🧠 تحميل AI model مرة واحدة عند التشغيل
async function loadModel() {
  model = await nsfw.load();
  console.log("AI Model Loaded");
}

// 🖼️ تحويل الصورة من URL إلى Tensor وتحليلها
async function checkImage(url) {
  const res = await fetch(url);
  const buffer = await res.buffer();

  const image = await tf.node.decodeImage(buffer, 3);
  const predictions = await model.classify(image);

  image.dispose(); // مهم لتوفير الذاكرة

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
};

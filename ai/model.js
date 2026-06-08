const nsfw = require("nsfwjs");
const tf = require("@tensorflow/tfjs-node");
const { loadImage, createCanvas } = require("canvas");

let model;

async function loadModel() {
  model = await nsfw.load();
  console.log("AI Model Loaded");
}

async function checkImage(path) {
  const img = await loadImage(path);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const predictions = await model.classify(canvas);

  let score = 0;

  for (const p of predictions) {
    if (["Porn", "Hentai", "Sexy"].includes(p.className)) {
      score += p.probability;
    }
  }

  return Math.min(score, 1);
}

module.exports = { loadModel, checkImage };

const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const fetch = require("node-fetch");

let model;

async function loadModel() {
  model = await nsfw.load();
  console.log("AI Model Loaded");
}

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

  return Math.min(score, 1);
}

module.exports = { loadModel, checkImage };

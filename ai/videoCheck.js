const extractFrames = require("../utils/extractFrames");
const { checkImage } = require("./model");
const fs = require("fs");

async function checkVideo(path) {
  const dir = "./frames_" + Date.now();

  await extractFrames(path, dir);

  const files = fs.readdirSync(dir);

  let scores = [];

  for (const file of files) {
    const score = await checkImage(`${dir}/${file}`);
    scores.push(score);
  }

  return Math.max(...scores);
}

module.exports = checkVideo;

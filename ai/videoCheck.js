const fs = require("fs");
const extractFrames = require("../utils/extractFrames");
const { checkImage } = require("./model");

async function checkVideo(videoPath) {
  const dir = "./frames_" + Date.now();

  fs.mkdirSync(dir, { recursive: true });

  await extractFrames(videoPath, dir);

  const files = fs.readdirSync(dir);

  let scores = [];

  for (const file of files) {
    scores.push(await checkImage(`${dir}/${file}`));
  }

  fs.rmSync(dir, { recursive: true, force: true });

  if (!scores.length) return 0;

  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b) / scores.length;

  return Math.max(max, avg);
}

module.exports = checkVideo;module.exports = checkVideo;

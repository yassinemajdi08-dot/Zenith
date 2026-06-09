const fs = require("fs");
const extractFrames = require("../utils/extractFrames");
const { checkImage } = require("./model");

async function checkVideo(path) {
  const dir = "./frames_" + Date.now();

  await extractFrames(path, dir);

  const files = fs.readdirSync(dir);

  let scores = [];

  for (const file of files) {
    const score = await checkImage(`${dir}/${file}`);
    scores.push(score);
  }

  // 🔥 أهم تحسين: حذف frames بعد الاستخدام
  fs.rmSync(dir, { recursive: true, force: true });

  return Math.max(...scores);
}

module.exports = checkVideo;

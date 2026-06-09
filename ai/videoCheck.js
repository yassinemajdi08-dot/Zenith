const fs = require("fs");
const extractFrames = require("../utils/extractFrames");
const { checkImage } = require("./model");

async function checkVideo(videoPath) {
  const dir = "./frames_" + Date.now();

  await extractFrames(videoPath, dir);

  const files = fs.readdirSync(dir);

  let scores = [];

  for (const file of files) {
    const score = await checkImage(`${dir}/${file}`);
    scores.push(score);
  }

  // 🧹 تنظيف مهم جدًا
  fs.rmSync(dir, { recursive: true, force: true });

  // 🧠 تحليل ذكي (متوسط + أقصى قيمة)
  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  return Math.max(max, avg);
}

module.exports = checkVideo;

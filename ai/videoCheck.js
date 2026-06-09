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

  // 🧠 تحسين: حذف المجلد لتفادي crash
  fs.rmSync(dir, { recursive: true, force: true });

  // 🔥 تحسين الدقة: إذا أي frame خطير جدًا → اعتبر الفيديو خطر
  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  // 🔥 قرار ذكي (أفضل من max فقط)
  return Math.max(max, avg);
}

module.exports = checkVideo;

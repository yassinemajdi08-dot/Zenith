const fs = require("fs");
const extractFrames = require("../utils/extractFrames");
const { checkImage } = require("./model");

async function checkVideo(videoPath) {
  const dir = "./frames_" + Date.now();

  fs.mkdirSync(dir, { recursive: true });

  try {
    await extractFrames(videoPath, dir);

    const files = fs.readdirSync(dir);

    let scores = [];

    for (const file of files) {
      const score = await checkImage(`${dir}/${file}`);
      scores.push(score);
    }

    fs.rmSync(dir, { recursive: true, force: true });

    if (scores.length === 0) return 0;

    const max = Math.max(...scores);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    return Math.max(max, avg);

  } catch (err) {
    console.log("Video error:", err.message);
    return 0;
  }
}

module.exports = checkVideo;

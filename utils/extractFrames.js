const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

function extractFrames(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    ffmpeg(videoPath)
      .screenshots({
        count: 5,
        folder: outputDir,
        filename: "frame-%i.png",
        size: "320x240"
      })
      .on("end", resolve)
      .on("error", reject);
  });
}

module.exports = extractFrames;

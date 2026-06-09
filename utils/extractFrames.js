const ffmpeg = require("fluent-ffmpeg");

function extractFrames(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
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

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

function extractFrames(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        "-vf fps=1",     // frame كل ثانية (خفيف)
        "-vframes 5"     // فقط 5 frames
      ])
      .save(`${outputDir}/frame-%d.png`)
      .on("end", resolve)
      .on("error", reject);
  });
}

module.exports = extractFrames;

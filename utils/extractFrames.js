const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

function extractFrames(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions([
        "-vf fps=1",
        "-vframes 5"
      ])
      .save(`${outputDir}/frame-%d.png`)
      .on("end", () => resolve())
      .on("error", (err) => reject(err));
  });
}

module.exports = extractFrames;

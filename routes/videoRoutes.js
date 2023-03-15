const videoRouter = require("express").Router();
const fs = require("fs");

function readVideoData() {
  const videoFile = fs.readFileSync("./data/video-details.json");
  const videosData = JSON.parse(videoFile);
  return videosData;
}

videoRouter.get("/", (req, res) => {
  const videosData = readVideoData();
  console.log("made it to router");

  const videos = videosData.map((video) => {
    return {
      id: video.id,
      image: video.image,
      title: video.title,
      channel: video.channel,
    };
  });
  console.log(videos);
  res.status(200).json(videos);
});

videoRouter.get("/:id", (req, res) => {
  const videoData = readVideoData();
  console.log("made it to single video");

  const selectedVideoData = videoData.find(
    (video) => video.id == req.params.id
  );
  console.log(selectedVideoData);

  res.status(200).json(selectedVideoData);
});

module.exports = videoRouter;

const videoRouter = require("express").Router();
const fs = require("fs");
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");



function readVideoData() {
  const videoFile = fs.readFileSync("./data/video-details.json");
  const videosData = JSON.parse(videoFile);
  return videosData;
}

function writeVideoData(data) {
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync("./data/video-details.json", stringifiedData);
}

videoRouter.get("/", (req, res) => {
  const videosData = readVideoData();

  const videos = videosData.map((video) => {
    return {
      id: video.id,
      image: video.image,
      title: video.title,
      channel: video.channel,
    };
  });
  res.status(200).json(videos);
});

videoRouter.get("/:id", (req, res) => {
  const videoData = readVideoData();

  const selectedVideoData = videoData.find(
    (video) => video.id == req.params.id
  );

  res.status(200).json(selectedVideoData);
});

videoRouter.post("/", (req, res) => {
  const videoPostData = readVideoData();
  const image = "https://i.imgur.com/l2Xfgpl.jpg";

  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: "Yuvi",
    image: image,
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "6:20",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: []
  }

  videoPostData.push(newVideo);
  writeVideoData(videoPostData);
  res.status(200).send();

});


module.exports = videoRouter;

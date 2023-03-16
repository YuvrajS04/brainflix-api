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
  console.log("made it to router");

  const videos = videosData.map((video) => {
    return {
      id: video.id,
      image: video.image,
      title: video.title,
      channel: video.channel,
    };
  });
  // console.log(videos);
  res.status(200).json(videos);
});

videoRouter.get("/:id", (req, res) => {
  const videoData = readVideoData();
  console.log("made it to single video");

  const selectedVideoData = videoData.find(
    (video) => video.id == req.params.id
  );
  // console.log(selectedVideoData);

  res.status(200).json(selectedVideoData);
});

videoRouter.post("/", (req, res) => {
  const videoPostData = readVideoData();

  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: "Yuvi",
    image: "",
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "6:69",
    video: "",
    timestamp: Date.now(),
    comments: []
  }
  console.log(newVideo);
  console.log("reached backend");

  videoPostData.push(newVideo);
  writeVideoData(videoPostData);
  res.status(200).send();

});


module.exports = videoRouter;

import express from 'express'
import fs from 'fs'
import path from "path"
import cors from "cors"
import { randomStr } from './utils/utils.js'
import { db } from './db.js'
import { Room } from './models/Room.js'

const app = express()
app.use(cors())

app.use(express.json())
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname,"/public")))


app.get("/videos",function(req,res) {
  const files = fs.readdirSync("videos")
  res.json(files)
})

app.post("/room",function(req,res) {
  console.log(req.body)
  const {video} = req.body
  if (!video) {
    res.json({error:"video not defined"}).status(401)
    return
  }
  const roomName = randomStr(6,"abcdefghijklmnopqrstuvwxyz")
  const room = new Room(roomName,video)
  db.push({...room})
  res.json({room})
})

app.get("/room/:name", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const {name} = req.params

  console.log(db)

  const room = db.find((room) => room.name === name )

  // get video stats (about 61MB)
  const videoPath = `videos/${room.video}`;
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

export default app;
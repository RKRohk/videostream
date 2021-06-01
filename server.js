import http from "http"
import app from "./app.js"
import {Server} from "socket.io"

export const server = http.createServer(app)
export const io = new Server(server,{cors: {
    origin: '*',
}})

io.on("connection",(socket) => {
    console.log("device connected")
    
    const room = socket.handshake.query.room
    console.log(socket.handshake.query)
    socket.join(room)

    socket.on("play",(arg) => {
        socket.to(room).emit("play",{...arg})
        console.log("play")
    })

    socket.on("pause",(arg) => {
        socket.to(room).emit("pause",{...arg})
    })

    socket.on("seeked",(arg) => {
        console.log(arg)
        socket.to(room).emit("seeked",{...arg})
    })

    socket.on("message",(arg) => {
        console.log(arg)
        socket.to(room).emit("message",{...arg})
    })
})

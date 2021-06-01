import { server } from "./server.js"

const PORT = 5000

server.listen(PORT,() => {
    console.log(`Started Server on PORT:${PORT}`)
})
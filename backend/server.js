const express = require("express")
const app = express()
const dotenv = require("dotenv")
const {chats} = require("./data/dummyData.js")
const {connectDB} = require("./config/db.js")
const userRouter = require("./routes/userRoutes.js")
const chatRouter = require("./routes/chatRoutes.js")
const messageRouter = require("./routes/messageRoutes.js")
const {notFound,errorHandler} = require("./middleware/errorMiddleware.js")
const cors = require("cors")

dotenv.config()
connectDB()

app.use(express.json())
app.use(cors());
app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRouter)

// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,() => {
  console.log(`running on ${PORT}`)
})

const io = require("socket.io")(server,{
  pingTimeOut : 60000,
  cors : {
    origin : "http://localhost:3000"
  }
})

io.on("connection",(socket) => {
  console.log("connected to socket.io")

  socket.on("setup",(userData) => {
      socket.join(userData._id)
      // console.log(`ID : ${userData._id}`)
      socket.emit("connected")
  })

  socket.on("join room",(room) => {
    socket.join(room)
    console.log(`room :  ${room}`)
  })

  socket.on("typing",(room) => {
      socket.in(room).emit("typing")
  })

  socket.on("stop typing",(room) => {
    socket.in(room).emit("stop typing")
})

  socket.on("new message",(newMessageRecieved) => {
      var chat = newMessageRecieved.chat
      if(!chat.users) return console.log("users not defined")

      chat.users.forEach((user) => {
        if(user._id === newMessageRecieved.sender._id){return}

        socket.in(user._id).emit("message recieved",newMessageRecieved)
      })
  })

  socket.off("setup",(userData) => {
    socket.join(userData._id)
    console.log("user disconnected")
    socket.leave(userData._id)
})

})


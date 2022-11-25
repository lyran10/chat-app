const asyncHandler = require("express-async-handler")
const { Chat } = require("../models/ChatModels")
const {User} = require("../models/UserModel.js")
const {Message} = require("../models/MessageModels.js")


const sendMessage = asyncHandler(async(req,res) => {

  const {content,chatId} = req.body
 
  var newMessage = {
    sender : req.user._id,
    content : content,
    chat : chatId
  }

  try {
        var message = await Message.create(newMessage)

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
          path : "chat.users",
          select : "name pic email"
        })

        await Chat.findByIdAndUpdate(chatId,{
          latestMessage : message
        })

        res.status(200).json(message)

  } catch (error) {
      res.status(400).json(error.message)
  }
})

const allMessage = asyncHandler(async(req,res) => {

    try {
      const messages = await Message.find({chat:req.params.chatId})
      .populate("sender","name pic email")
      .populate("chat")
    
      res.status(200).json(messages)
    } catch (error) {
      res.status(400).json(error.message)
    }


})

module.exports = {sendMessage, allMessage}
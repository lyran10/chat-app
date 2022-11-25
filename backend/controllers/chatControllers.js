const asyncHandler = require("express-async-handler")
const { Chat } = require("../models/ChatModels")
const {User} = require("../models/UserModel.js")

const accessChat = asyncHandler(async(req,res) => {
    const {userId} = req.body
    if(!userId){
     return res.status(400).json({userId : "no user ID"})
    }

    var chat = await Chat.find({
      isGroupChat : false,
      $and : [{
        users : {$elemMatch : { $eq :req.user._id }},
        users : {$elemMatch : { $eq : userId }}
      }]
    }).populate("users","-password").populate("latestMessage")

    chat = await User.populate(chat,{
      path : "latestMessage.sender",
      select : "name pic email"
    })

    if(chat.length > 0){
      return res.status(201).json(chat[0])
    }else{
      var chatData = {
        chatName : "sender",
        isGroupChat : false,
        users : [req.user._id,userId]
      }
        try {
          const createChat = await Chat.create(chatData)

          const newChat = await Chat.findOne({_id : createChat._id}).populate("users","-password")

          res.status(201).json({chat : newChat})
        } catch (error) {
          res.status(401).json({chat : error})
        }
      
    }

})

const fetchChat = asyncHandler(async(req,res) => {
  const userId = req.body

  try {
        await Chat.find({users :{$elemMatch : {$eq : req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt : -1})
        .then(async (data) => { 
          results = await User.populate(data,{
            path : "latestMessage.sender",
            select : "name email pic"
          })
          res.status(200).json(results)
        })  
         
  } catch (error) {
        res.status(401).json({error : error})
  }

})

const createGroup = asyncHandler(async(req,res) => {
  const {groupName,users} = req.body
    if(!users || !groupName){
     return res.status(401).json({message : "Fill all details"})
    }else if(req.body.users.length < 2){
     return res.status(401).json({message : "Need minimum 2 users to create a group"})
    }

    users.push(req.user)

    try {
        const groupChat = await Chat.create({
          chatName : groupName,
          users : users,
          isGroupChat : true,
          groupAdmin : req.user
        })
        
        // const fullGroupChat = await Chat.find({ _id : req.user._id})
        // .populate("users","-password")
        // .populate("groupAdmin","-password")

        await Chat.find({users :{$elemMatch : {$eq : req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt : -1})
        .then(async (data) => { 
          results = await User.populate(data,{
            path : "latestMessage.sender",
            select : "name email pic"
          })
          res.status(201).json(results)
        })
        .catch((error) => {
          res.status(401).json(error)
        })

        // res.status(201).json({ groupChat : fullGroupChat })
    } catch (error) {
      res.status(401).json({ groupChat : false })
    }


})

const renameGroup = asyncHandler(async(req,res) => {
    const {chatId,groupName} = req.body
  
    
      const updatedChatName = await Chat.findByIdAndUpdate(
        chatId,
          {chatName : groupName},
          {new : true} 
      )
      .populate("users","-password")
      .populate("groupAdmin","-password")

      if(!updatedChatName){
        res.status(401).json({message : "chat not found"})
      }else{
        res.status(201).json({message :updatedChatName})
      }
})

const addToGroup = asyncHandler(async(req,res) => {
    const {chatId,userId} = req.body
  
    const add = await Chat.findByIdAndUpdate(
      chatId,
      {$push : {users : userId}},
      {new : true}
    )
    .populate("users","-password")
    .populate("groupAdmin", "-password")

    if(!add){
      res.status(401).json({message : "chat not found"})
    }else{
      res.status(201).json({message : add})
    }
})

const removeFromGroup = asyncHandler(async(req,res) => {
  const {chatId,userId} = req.body

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    {$pull : {users : userId}},
    {new : true}
  )
  .populate("users","-password")
  .populate("groupAdmin", "-password")

  if(!remove){
    res.status(401).json({message : "chat not found"})
  }else{
    await Chat.find({users :{$elemMatch : {$eq : req.user._id}}})
  .populate("users","-password")
  .populate("groupAdmin","-password")
  .populate("latestMessage")
  .sort({updatedAt : -1})
  .then(async (data) => { 
    results = await User.populate(data,{
      path : "latestMessage.sender",
      select : "name email pic"
    })
    res.status(201).json({res : results, message : remove})
  })
  .catch((error) => {
    res.status(401).json(error)
  })
  }
})


module.exports = {accessChat, fetchChat, createGroup, renameGroup, addToGroup,removeFromGroup}
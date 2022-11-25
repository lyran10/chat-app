const asyncHandler = require("express-async-handler")
const {User} = require("../models/UserModel.js")
const {token} = require("../config/generateToken.js")

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body

      if(!name || !email || !password){
       return res.status(401).json({message : "Fields Are Empty",status:false})
      }
  
      const userExists = await User.findOne({email})
  
      if(userExists){
        return res.status(401).json({message : "Email Already Exists",status:false})
        
      }
  
      const user = User.create({name,email,password,pic})

      if(user){
        user.then(data => {
         return res.status(201).json({User : user,status:true,token : token(data._id)})
        })
        }else{
       return res.status(400).json({message : "user not created",status : false})
      }
    
   
})

const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    
    const user = await User.findOne({email})
    if(user && await user.matchPassword(password)){
      let userData = {
        id : user._id,
        name : user.name,
        email : user.email,
        pic :user.pic,
      }
          res.status(201).json({_id : user._id,name : user.name,email:user.email,pic : user.pic,status:true,token : token(user._id)})
    }else{
      res.status(401).json({invalid: "Invalid Details",status:false})
    }
})

const allUsers = asyncHandler(async(req,res) => {
  const query = req.query.search 
  ? {
    $or : [
      {name : {$regex : req.query.search, $options : "i"}},
      {email : {$regex : req.query.search, $options : "i"}},
    ],
  } : {}
  
  try {
    const users = await User.find(query).find({_id : {$ne :req.user._id}})
    res.status(201).json({users : users})
  } catch (error) {
    res.status(401).json({users : "no users"})
  }
  
})



module.exports = {registerUser,authUser,allUsers}
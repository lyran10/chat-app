const express = require("express")
const router = express.Router()
const {Auth} = require("../middleware/authMiddleWare.js")
const {accessChat,fetchChat,createGroup,renameGroup,addToGroup,removeFromGroup} = require("../controllers/chatControllers.js")


router.post("/",Auth,accessChat)
router.get("/",Auth,fetchChat)
router.post("/group",Auth,createGroup)
router.put("/rename",Auth,renameGroup)
router.put("/add",Auth,addToGroup)
router.put("/remove",Auth,removeFromGroup)

module.exports = router
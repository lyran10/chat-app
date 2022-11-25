const express = require("express")
const { Auth } = require("../middleware/authMiddleWare")
const {sendMessage,allMessage} = require("../controllers/messageContollers")
const router = express.Router()


router.post("/",Auth,sendMessage)
router.get("/:chatId",Auth,allMessage)


module.exports = router
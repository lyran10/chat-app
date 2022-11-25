const express = require("express")
const router = express.Router()
const {registerUser,authUser,allUsers} = require("../controllers/userControllers.js")
const {Auth} = require("../middleware/authMiddleWare.js")


router.route("/").post(registerUser).get(Auth,allUsers)
router.post("/login",authUser)


module.exports = router
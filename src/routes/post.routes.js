const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer") //form data cannot be read by app.use(express()) middleware so we use multer middleware
const upload = multer({storage : multer.memoryStorage()}) 

postRouter.post("/",upload.single("image"),postController.createPostController)//Jiss naam se bhi user file bhejega same whi naam upload.single("") mein likhna pdega.

module.exports = postRouter
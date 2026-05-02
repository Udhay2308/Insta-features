const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ""
    },
    imgUrl : {
        type : String,
        require : [true,"imgUrl is required for creating the post"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        require : [true, "user id required for creating the post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel
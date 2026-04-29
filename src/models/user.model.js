const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
       type : String,
       unique : [true, "Username already exist..."],
       required : [true, "Username is required.."],
    },
    email: {
       type : String,
       unique : [true, "Email already exist..."],
       required : [true, "Email is required.."],
    },
    password: {
       type : String,
       required : [true, "Password is required..."],
    },
    bio : String,
    profileImage : {
        type : String,
        default : "https://ik.imagekit.io/tkbwfzftk/default-avatar-profile-trendy-style-social-media-user-icon-187599373.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
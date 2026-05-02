const userModel = require("../models/user.model");
// const crypto = require("crypto") // Basic for hashing.
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerController (req,res){
    const { username,email,password,bio,profileImage } = req.body;

    // const isUserExistByEmail = await userModel.findOne({email});

    // if(isUserExistByEmail){
    //     return req.statusCode(409).json({
    //         message : "User already exists with this email.."
    //     })
    // }
    // const isUserExistByUsername = await userModel.findOne({username});

    // if(isUserExistByUsername){
    //     return req.statusCode(409).json({
    //         message : "User already exists with this username.."
    //     })
    // }

    const isUserExist = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    });

    if(isUserExist){
        return res.status(409).json({
            message : "User already exists.." + (isUserExist.email == email ? "Email already exists" : "Username already exists..")
        })
    }
    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password : hash,
        bio,
        profileImage
    })
    const token = jwt.sign({
       id :  user._id
    },process.env.JWT_SECRET,{expiresIn: "1d"})

    res.cookie("token",token)
    res.status(201).json({
        message : "User resistered successfully..",
        user:{
            username : user.username,
            email : user.email,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
}


async function loginController (req,res){
    const { username,email,password } = req.body;
    const user = await userModel.findOne({
        $or : [
            {username : username},
            {email : email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message : "User not found..."
        })
    }
    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    // const isPasswordValid = hash == user.password
    const isPasswordValid = await bcrypt.compare(password,user.password)



    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid Password.."
        })
    }

     const token = jwt.sign({
       id :  user._id
    },process.env.JWT_SECRET,{expiresIn: "1d"})

    res.cookie("token",token)
    res.status(201).json({
        message : "User loggedIn successfully..",
        user:{
            username : user.username,
            email : user.email,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}
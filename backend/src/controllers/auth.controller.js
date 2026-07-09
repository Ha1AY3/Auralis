const userModel = require("../models/auth.model");
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function registerController(req, res){
    const {username, email, password} = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyRegistered){
        return res.status(400).json({
            message: "User with the same username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const registerUser = await userModel.create({
        username, 
        email,
        password: hash
    })

    const token =  jwt.sign({
        id: registerUser._id,
        username: registerUser.username
    },
    process.env.JWT_SECRET,
    {expiresIn: "3d"}

    )

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        registerUser: {
            id: registerUser._id,
            username: registerUser.username,
            email: registerUser.email
        }
    })


}

async function loginController(req, res){
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    }).select("+password");

    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid  credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
    process.env.JWT_SECRET,
    {expiresIn: "3d"}
    )

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function getMeController(req, res){
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user
    })
}

async function logoutUserController(req, res){
    const token = req.cookies.token;

    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

    await redis.set(token, Date.now().toString());

    res.status(201).json({
        message: "Logout successfull"
    })
}


module.exports = {registerController, loginController, getMeController, logoutUserController};
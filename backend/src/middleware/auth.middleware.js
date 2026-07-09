const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function authUser(req, res, next){
    const token = req.cookies.token;

    if( !token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token);

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        throw err;
    }

    req.user = decoded;
    next();

}

module.exports = {authUser};
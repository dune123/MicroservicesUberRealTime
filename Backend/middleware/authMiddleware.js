const UserModel=require('../models/UserModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/BlackListTokenModel');
const CaptainModel = require('../models/CaptainModel');

module.exports.authUser=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        const isBlackListed=await blackListTokenModel.findOne({token:token})

        if(isBlackListed){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user=await UserModel.findById(decoded._id);

        req.user=user;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"Unauthorized"})
    }
}

module.exports.authCaptain=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        const isBlackListed=await blackListTokenModel.findOne({token:token})

        if(isBlackListed){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        const captain=await CaptainModel.findById(decoded._id);

        req.captain=captain;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"Unauthorized"})
    }
}
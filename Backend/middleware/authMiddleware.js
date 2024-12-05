const UserModel=require('../models/UserModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports.authUser=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        const isBlackListed=await UserModel.findOne({token:token})

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
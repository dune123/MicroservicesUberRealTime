const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/UserModel')
const { validationResult } =require('express-validator');
const UserModel = require('../models/UserModel');

module.exports.registerUser=async(req,res,next)=>{
    try {

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()})
        }
        
        const {fullname,email,password}=req.body;

        if(!fullname||!email||!password){
            return res.status(400).json({message:'All fields are required'})
        }

        const findEmail=await UserModel.find({email});
        if(findEmail.length>0){
            return res.status(409).json({message:'This email already exists'})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({
            fullname:{
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email,
            password:hashedPassword
        })
        
        const savedUser=await user.save();

        const authToken=jwt.sign({_id:savedUser._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'7d'}
        )

        return res.status(200).json({message:"User creared successfully",savedUser,authToken});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports.loginUser=async(req,res,next)=>{
    try {
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {email,password}=req.body;

        //in model i did select false that means i dont want password to come and in order to get password i have to do '+password'
        const user=await UserModel.findOne({email}).select('+password')

        if(!user){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const comparePassword=await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const authToken=jwt.sign({_id:user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:'7d'}
        )

        return res.status(200).json({
           authToken,user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
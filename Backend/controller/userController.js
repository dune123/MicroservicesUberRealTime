const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/UserModel')
const { validationResult } =require('express-validator')

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
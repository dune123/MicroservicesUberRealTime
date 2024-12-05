const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { validationResult } =require('express-validator');
const CaptainModel = require('../models/CaptainModel');

module.exports.registerCaptain=async(req,res,next)=>{
    try {

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()})
        }
        console.log(req.body);
        const {fullname,email,password,vehicle}=req.body;

        if(!fullname||!email||!password||!vehicle){
            return res.status(400).json({message:'All fields are required'})
        }

        const findCap=await CaptainModel.findOne({email});

        if(findCap){
            return res.status(400).json({message:'Email already exists'})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newCaptain=new CaptainModel({
            fullname: { 
                firstname: fullname.firstname, 
                lastname: fullname.lastname 
            },
            email,
            password: hashedPassword,
            vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }})

        const savedCaptain=await newCaptain.save();

        const authToken=jwt.sign({id:savedCaptain._id},process.env.JWT_SECRET_KEY,{expiresIn:'24h'})

        res.status(201).json({authToken,savedCaptain});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { validationResult } =require('express-validator');
const CaptainModel = require('../models/CaptainModel');
const BlackListTokenModel=require('../models/BlackListTokenModel')

module.exports.registerCaptain=async(req,res,next)=>{
    try {

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()})
        }
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

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            
            return res.status(400).json({ message: 'Email and password are required' });
        }

        
        const findCap = await CaptainModel.findOne({ email }).select('+password');

        if (!findCap || !findCap.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, findCap.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password or email' });
        }

        const authToken = jwt.sign({ _id: findCap._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ findCap, authToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getCaptainProfile=async(req,res,next)=>{
    try {
        const currentCaptain=req.captain;
        return res.status(200).json({currentCaptain})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports.logoutCaptain=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization.split(" ")[1];

        await BlackListTokenModel.create({token})

        return res.status(200).json({message:"Logged Out"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
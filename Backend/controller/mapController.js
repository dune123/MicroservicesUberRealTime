const { default: axios } = require('axios');
const mapServices=require('../services/mapServices')
const {validationResult}=require('express-validator')

module.exports.mapController=async(req,res,next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
        
    const {address}=req.query;
    try {
        const coordinates=await mapServices.getAddress(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message:'Coordinate not found'})
    }
}

module.exports.getDistanceTime=async(req,res,next)=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination}=req.query;

        const distanceTime = await mapServices.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAutoCompleteSuggestions=async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {input}=req.query;

        const suggestions =await mapServices.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
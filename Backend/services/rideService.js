const rideModel=require('../models/RideModel');
const mapServices=require('./mapServices')
const bcrypt=require('bcrypt');
const crypto=require('crypto');

async function getFare(pickup,destination){
    if(!pickup||!destination){
        throw new Error('Pickup and destination are required')
    }

    const distanceTime=await mapServices.getDistanceTime(pickup,destination);

    const baseFare={
        auto:30,
        car:50,
        moto:20
    }

    const perKmRate={
        auto:10,
        car:15,
        moto:8
    }

    const perMinuteRate={
        auto:2,
        car:3,
        moto:1.5
    }
//        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),

    const fare={
        auto:Math.round(baseFare.auto+((distanceTime.distance.value/1000)*perKmRate.auto)+((distanceTime.duration.value/60)*perMinuteRate.auto)),
        car:Math.round(baseFare.car+((distanceTime.distance.value/1000)*perKmRate.car)+((distanceTime.duration.value/60)*perMinuteRate.car)),
        moto:Math.round(baseFare.moto+((distanceTime.distance.value/1000)*perKmRate.moto)+((distanceTime.duration.value/60)*perMinuteRate.moto))
    }

    return fare;
}

module.exports.getFare=getFare;

function getOtp(num){
    const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide=async({
    user,pickup,destination,vehicleType
})=>{
    if(!user||!pickup||!destination||!vehicleType){
        throw new Error('All fields are required');
    }

    const fare=await getFare(pickup,destination);
    const otp = getOtp(6);
    
    const ride=new rideModel({
        user,
        pickup,
        destination,
        otp,
        fare:fare[vehicleType]
    })

    await ride.save();

    return ride;
}
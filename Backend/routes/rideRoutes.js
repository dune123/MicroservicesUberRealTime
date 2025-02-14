const express=require('express');
const router=express.Router();
const {body,query}=require('express-validator')
const {authUser, authCaptain}=require('../middleware/authMiddleware')
const {createRide, getFare,confirmRide,startRide}=require('../controller/rideController')

router.post('/create',
    authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid Vehicle Type'),
    createRide
)

router.get('/get-fare',authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid Destination')
    ,getFare);

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRide
)

module.exports=router;
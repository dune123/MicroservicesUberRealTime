const express=require('express');
const router=express.Router();
const {body}=require('express-validator')
const {authUser}=require('../middleware/authMiddleware')
const {createRide}=require('../controller/rideController')

router.post('/create',
    authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invalid Vehicle Type'),
    createRide
)

module.exports=router;
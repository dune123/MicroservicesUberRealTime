const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const { registerCaptain,getCaptainProfile,loginCaptain, logoutCaptain } = require('../controller/captainController');
const { authCaptain } = require('../middleware/authMiddleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle')
],registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be aleast 6 charecteer')
],loginCaptain);

router.get('/getCaptainProfile',authCaptain,getCaptainProfile);

router.get('/logout',logoutCaptain)



module.exports=router;
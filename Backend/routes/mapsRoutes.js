const express=require('express');
const router=express.Router();
const {authUser}=require('../middleware/authMiddleware')
const {mapController,getDistanceTime,getAutoCompleteSuggestions}=require('../controller/mapController') 
const {query}=require('express-validator')

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    authUser,mapController)
router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authUser,
    getDistanceTime
)
router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authUser,
    getAutoCompleteSuggestions
)

module.exports=router;
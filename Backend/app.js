const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const cookiesParser=require('cookie-parser')
const {connectToDb}=require('./db/db');
const userRoutes=require('./routes/userRoutes');
const captainRoutes=require('./routes/captainRoutes');
const mapsRoutes=require('./routes/mapsRoutes');
const rideRoutes=require('./routes/rideRoutes');
const cookieParser = require('cookie-parser');
const app=express();

connectToDb();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/users',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes)
app.use('/ride',rideRoutes);

module.exports = app;
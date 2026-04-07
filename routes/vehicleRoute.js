const express = require('express');

const vehicleRoute = express.Router();

vehicleRoute.post('./addVehicle',(req,res,next)=>{
    console.log(req.body)
    
})



exports.vehicleRoute = vehicleRoute
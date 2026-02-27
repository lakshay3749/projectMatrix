const express = require('express');
const { passController, addResidentVehicleController } = require('../controller/passController');
const { verifyPassController } = require('../controller/passController');

const passRoute = express.Router();




passRoute.post('/addVisitorPass',passController);

passRoute.post('/verifyVisitorPass',verifyPassController)

passRoute.post('/addResidentVehicles',(req,res,next)=>{
    console.log(req.body,"boli")
    res.status(200).json({ message: "Data received successfully!"})
    

})

passRoute.get('./hello',(req,res,next)=>{
    console.log(req.body)
})


exports.passRoute = passRoute
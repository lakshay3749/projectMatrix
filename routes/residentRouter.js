const express = require('express')
const { addResidentController,setAllSerStaffController, authResidentController, sendPushNot2ResidentController, getNotifInfoController, respondRequestController, getResidentNotifController, addServiceStaffController, exitServiceStaffController } = require('../controller/residentController')
const multer = require("multer")

const cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name: "dd5pdy82n",
  api_key: "397341551664711",
  api_secret: "G8Erp1raivFJyMChleae3nOXwpI"
});


const residentRoute = express.Router()

const upload = multer({dest:"uploads/"})

residentRoute.post('/addResident',upload.single("photo"),addResidentController)

residentRoute.post('/authResident',authResidentController)


residentRoute.post('/sendPushNotification',upload.single("image"),sendPushNot2ResidentController)

residentRoute.get('/getNotifInfo',getNotifInfoController)


residentRoute.post('/respondRequest',respondRequestController)


residentRoute.get('/getNotif',getResidentNotifController)


residentRoute.post('/addServiceStaff',addServiceStaffController)

residentRoute.post('/exitSerStaff',exitServiceStaffController)

residentRoute.get('/getAllSerStaff',setAllSerStaffController)

exports.residentRoute = residentRoute

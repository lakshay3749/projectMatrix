const {Resident,ResidentRequest,ResidentNotifications,ServiceStaff} = require('../model/residentModel')

const cloudinary = require('cloudinary').v2
const fetch = require("node-fetch")

const { getIO, getGuardSocketId } = require('../socket')
const customAlphabet = require('nanoid').customAlphabet
const admin = require('../firebase.js')

cloudinary.config({
  cloud_name: "dd5pdy82n",
  api_key: "397341551664711",
  api_secret: "G8Erp1raivFJyMChleae3nOXwpI"
});



exports.addResidentController = async (req,res,next)=>{

    console.log(req.body)
    console.log(req.file,'bedi')

    const { email, flat, id, members, name, password, phone, status, } = req.body;

    const photo ='https://res.cloudinary.com/dd5pdy82n/image/upload/v1774505644/wmnurnvn3iiydjwv1dor.jpg'

     try {

    // const result = await cloudinary.uploader.upload(req.file.path)

    // console.log(result.secure_url,"url to resident")

    
   try {

    const resident = new Resident({name,email,residentId:id,password,phoneNumber:phone,status,photo,flatNumber:flat})
    await resident.save()
    console.log("Success")

   } catch (error) {
    console.log(error,'bitch')
   }

    //  await PersonalStaff.findOneAndUpdate(
    //     {workerId },
    //     {
    //         $set: { photo: result.secure_url }
    //     },
    //     { new: true }
    //     );

    //     res.status(200).json({ message: "Photo Updated Successfully !",photoUrl:result.secure_url });

    

    
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"photo cant be uploaded!"})
  }



//     console.log("Server hit!")

//    try {

//     const resident = new Resident({name,email,residentId:id,phoneNumber:phone,status,flatNumber:flat})
//     await resident.save()
//     console.log("Success")

//    } catch (error) {
//     console.log(error)
//    }

//     console.log(req.body,"We are at add resident controller!")
}


exports.authResidentController = async (req,res,next)=>{
    console.log(req.body,'ghj')

    const {phone,password,residentId,token} = req.body

    

    try {
 
    const resident = await Resident.findOne({ residentId });

    if (!resident) {
            console.log("Resident not exists ")

        }

        else if (resident.password !== password) {
            console.log("Password Not match!!")
        }
    
        else{
            
     
        const data =  await Resident.updateOne(
  { residentId },
  { $set: { fcmToken: token } }
)
          const rest = await Resident.findOne({residentId})

        res.status(200).json(rest)

        }

    
    
    }catch(error){
        console.log(error)
     }


     


}





exports.sendPushNot2ResidentController = async (req,res,next)=>{

  console.log(req.body)

  const {guardId,requestId,flat,purpose,phone,visitorName} = req.body




 const residentId = 'Res-B402'

 const result = await cloudinary.uploader.upload(req.file.path)

 console.log(result.secure_url,"url to staff")
 

 const visitorDetails = {
  name:visitorName,
  phoneNumber:phone,
  photoUrl: result.secure_url || 'https://res.cloudinary.com/dd5pdy82n/image/upload/v1774505644/wmnurnvn3iiydjwv1dor.jpg'
 }

 const flatNumber = flat

 try {
  
 const request = new ResidentRequest({requestId,guardId,residentId,purpose,visitorDetails,flatNumber})
  
 const respon = await request.save()

 const resident = await Resident.findOne({residentId})




 console.log(respon,"New Request saved to db")

  const rest = await admin.messaging().send({
  token: resident.fcmToken,
  notification: {
    title: "Gate Alert",
    body: "Visitor arrived"

  },
  data: {
    type:"Visitor",
    requestId,
    screen:'Notif',
    name:'Danish'
  }
})

 res.status(200).json(respon)





 } catch (error) {
  console.log(error)
 }





  
}

exports.getNotifInfoController =async (req,res,next)=>{

  const {requestId} = req.query
  
  try {
  const result = await ResidentRequest.findOne({requestId})

  res.status(200).json(result)

  } catch (error) {
    res.status(500)
  }

}


exports.respondRequestController = async (req,res,next)=>{

  

  console.log(req.body,'Action done by resident holy crab!!!')

  const {requestId,action} = req.body

  try {
  const request = await ResidentRequest.findOne({requestId})

  request.status = action


  const response = await request.save()



  
  const io = getIO()
  const socketId = getGuardSocketId(request.guardId)

   if (socketId) {
    io.to(socketId).emit("respondRequest", {status:action,requestId});
  } else {
    console.log("Guard not online");
  }


  console.log(response,'saved !!!!!!!')

  res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }

}

exports.getResidentNotifController = async (req,res,next)=>{
  console.log(req.query)
  const {residentId} = req.query

  const rest = await ResidentNotifications.findOne({residentId})
  console.log(rest)
  res.status(200).json(rest)
}

exports.addServiceStaffController = async (req,res,next)=>{
  console.log(req.body)

  const {workerName,flat,entryTime,category,serviceStaffId} = req.body

  const newStaff = new ServiceStaff({workerName,flat,entryTime,category,serviceStaffId})

  const rest = await newStaff.save()

  
  
  const resident = await Resident.findOne({residentId:"Res-B402"})
  
  const residentId = 'RES-B204'

  const ret=  await ResidentNotifications.updateOne(
                   { residentId},
                   { $push: { notifList: { name:workerName, category, entryTime } } }
               );

               console.log(ret)



  const token = resident.fcmToken

  const response = await admin.messaging().send({
               token,
               notification: {
                 title:`${category} entered`,
                 body: `Name ${workerName}`
             
               },
               data: {
                 type:category,
                 screen:'NotifList',
                 name:workerName
               }
   })

   

   res.status(200).json(rest)
}

exports.setAllSerStaffController = async (req,res,next)=>{
  const remainStaff = await ServiceStaff.find({locationStatus:'inside'})
  res.status(200).json(remainStaff)
}

exports.exitServiceStaffController = async (req,res,next)=>{
  try {
  console.log(req.body)

  const {serviceStaffId} = req.body
  const ret=  await ServiceStaff.updateOne(
                   { serviceStaffId},
                   { $set: { locationStatus: 'outside' } }
               );
  res.status(200).json({message:'Service Staff Exited',serviceStaffId})

  } catch (error) {
    
  }
}

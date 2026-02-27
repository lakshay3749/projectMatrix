const { default: mongoose } = require("mongoose");
const { Passes, Passes_Info,Vehiles_Add } = require("../model/passModel");

const { ObjectId } = mongoose.Types;


exports.passController = async (req,res,next)=>{

    

    console.log(req.body)
    console.log("Serwor works access")

    let {residentID,vehicleNumber,vehicleType} = req.body;
   
    const {plateNumber} = req.body
    

    if(residentID != null){

        vehicleNumber = vehicleNumber.toUpperCase()

        console.log("hello lucifer")


        const residentVehicles = new Vehiles_Add({residentId:residentID,vehicleNumber,vehicleType})

        try {
            const response = await residentVehicles.save()
            console.log(response,"Saved to mongo successfully")
            res.status(200).json({ message: "Data received successfully!"})
        
            next()

        } catch (error) {
             console.log(error.errors,"someerror comes 12345")
        }
       
    }else if (plateNumber!=null){
        try {
           const vehicleNumber = plateNumber

            const foundVehicle = await Vehiles_Add.findOne({ vehicleNumber })

            console.log(foundVehicle)

            if (!foundVehicle) { return res.status(404).json({ success: false, message: "Not a resident Vehicle" }); }

            return res.status(200).json({success:true,message:"Resident Vehicle"})



        } catch (error) {
            console.log(error)
        }



    }
    else {
        const {passId,residentId,visitorName,visitorCount,phone,passType,purpose,duration,visitDate,flatNumber,status,entryAllowed,createdAt}  = req.body

    // const block = new Block({societyId,blockName});  // collection name

    const passes = new Passes({ passId,flatNumber,createdAt});
    const passInfo = new Passes_Info({passId,visitorName,visitorCount,phone,purpose,visitDate,duration})
    try {
        const res1 =await passes.save()
        const res2 =await passInfo.save()
        console.log(res1,res2,"successfulll")
        res.status(200).json({ message: "Data received successfully!"})
        
        next()

    } catch (error) {
        console.log(error.errors,"someerror comes 1234")
    }

    }

    
}

exports.verifyPassController = async (req, res, next) => {


    const {vehicleNumber} = req.body 

    if(vehicleNumber!=null){
        console.log(req.body,"yey")
    }else{

        try {
    const {passId} = req.body
    
    const pass = await Passes.findOne({passId})

    console.log(pass)

    if (!pass) { return res.status(404).json({ success: false, message: "Pass not found" }); }

    else if (!pass.entryAllowed){
        pass.status = "Approved"
        pass.entryAllowed = true
        pass.entryTime = new Date().toLocaleTimeString();
        await pass.save()

        return res.json({ success: true, message: "Entry allowed" });

    }else{
        return res.status(400).json({ success: false, message: "Pass already used" });
    }



  } catch (error) {
    console.log(error)
  }
    }
  
}


exports.addResidentVehicleController = async (req,res,next)=>{
    console.log(req.body)

    
    const vehicle = new Vehiles_Add(req.body);
    
    try {
        
        const res2 =await vehicle.save()
        console.log(res2,"successfulll")
        res.status(200).json({ message: "Data received successfully!"})
        
        next()

    } catch (error) {
        console.log(error.errors,"someerror comes")
    }
}
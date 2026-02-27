const { default: mongoose } = require("mongoose");



const visitorPassesSchema = new mongoose.Schema({
    passId:{type: String,required:true,index:true},
    flatNumber:{type:String,required:true},
    status:{type:String,default:'Pending'},
    entryAllowed:{type:Boolean,default:false},
    entryTime:{type:String,default:null},
    createdAt:{type:String,required:true},

})


const visitorPassesInfoSchema = new mongoose.Schema({
   passId:{type:String,required:true,index:true},
   visitorName:{type:String,required:true},
   visitorCount:{type:Number,default:1},
   phone:{type:String , default:"Not Provided"},
   purpose:{type:String,default:"Visit"},
   duration:{type:String,default:"Day"},
   visitDate:{type:String,required:true},

})

const addResidentVehiclesSchema = new mongoose.Schema({
    residentId:{type:String,required:true},
    vehicleNumber:{type:String,required:true,},
    vehicleType:{type:String,required:true}
})

const Vehiles_Add = mongoose.model("ResidentVehicles",addResidentVehiclesSchema)

const Passes = mongoose.model("Passes", visitorPassesSchema);
const Passes_Info = mongoose.model("Passes_Info", visitorPassesInfoSchema);
 
module.exports = { Passes, Passes_Info,Vehiles_Add };
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



const staffPassSchema = new mongoose.Schema({
    gateCode:{type:String,required:true,index:true},
    flatNo : {type:String,required:true,index:true},
    workerName:{type:String,required:true},
    jobType :{type:String,required:true},
    workDate:{type:Date,required:true},
    status:{type:String,default:"Active"}
})

const staffPassSchemaInfo = new mongoose.Schema({
    residentId : {type:String,required:true,index:true},
    gateCode:{type:String,required:true},
    workerName:{type:String,required:true},
    workDate:{type:Date,required:true},
    jobType:{type:String,required:true},
    entryTimeStamp:{type:Date,default:null},
    finalStatus:{type:String,default:"Pending"}
})

const addResidentVehiclesSchema = new mongoose.Schema({
    residentId:{type:String,required:true},
    vehicleNumber:{type:String,required:true,},
    vehicleType:{type:String,required:true}
})









const permanentStaffSchema = new mongoose.Schema({
  workerId: { type: String, required: true, index: true },
  residentId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['maid', 'driver', 'cook', 'nanny', 'cleaner'], 
    default: 'maid' 
  },
  phone: { type: String, required: true },
  photo: { type: String }, 
  salary: { type: String },
  since: { type: String },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'on-leave'], 
    default: 'active' 
  },
  entryAllowed: { type: Boolean, default: true },
  schedule: {
    Mon: { type: Boolean, default: true },
    Tue: { type: Boolean, default: true },
    Wed: { type: Boolean, default: true },
    Thu: { type: Boolean, default: true },
    Fri: { type: Boolean, default: true },
    Sat: { type: Boolean, default: false },
    Sun: { type: Boolean, default: false },
  },
  shift: { type: String },
  flat:{type:String,required:true},
  locationStatus: { 
  type: String, 
  enum: ['inside', 'outside'], 
  default: 'outside' 
},


  // THIS IS THE IMPORTANT PART
  attendance: [{
    date: { type: String, required: true }, 
    status: { 
      type: String, 
      enum: ['present', 'absent', 'leave'], 
      required: true 
    },
    
    timeIn: { type: String },
    arrivalStatus: { type: String }, // Moved inside
    
  }],

  tasks: [String]
}, { timestamps: true }); 












const Vehiles_Add = mongoose.model("ResidentVehicles",addResidentVehiclesSchema)

const Passes = mongoose.model("Passes", visitorPassesSchema);
const Passes_Info = mongoose.model("Passes_Info", visitorPassesInfoSchema);

const StaffPasses = mongoose.model("StaffPasses",staffPassSchema)
const StaffPassesInfo = mongoose.model("StaffPassInfo",staffPassSchemaInfo)

const PersonalStaff = mongoose.model("PersonalStaff",permanentStaffSchema)

module.exports = { Passes, Passes_Info,Vehiles_Add ,StaffPasses,StaffPassesInfo,PersonalStaff};
const { default: mongoose } = require("mongoose");




const residentSchema = new mongoose.Schema({
  name: {type:String,required:true,},
  residentId:{type:String,required:true,index:true},
  flatNumber: {type:String,required:true},
  password:{type:String,require:true},
  photo:{type:String,default:null},
  phoneNumber: {type:String,required:true,},
  fcmToken: { type: String, default: null }, 
  isLoggedIn: { type: Boolean, default: false },
  email:{type:String,default:null},
  status :{type:String, 
    enum:['inactive','active',],
    default : 'inactive'
  }
})

const visitorRequestSchema = new mongoose.Schema({
  
  requestId: { type: String, unique: true, required: true,index:true },
  guardId: { type: String, required: true }, 
  residentId: { type: String, required: true ,index:true}, 
  

  status: { 
    type: String, 
    enum: ['pending', 'approved', 'denied', 'entered', 'exited'], 
    default: 'pending' 
  },
  purpose: { type: String, required: true }, 
  entryTime: { type: Date, default: Date.now },

  visitorDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, default:null },
    photoUrl: { type: String }, 
  },


  flatNumber: { type: String, required: true },

})


const worker2ResidentSchema = new mongoose.Schema({
  workerId: { type: String, required: true, index: true ,unique:true},
  workerName:{type:"String",required:true},
  category:{type:'String',required:true},
  residentList: [
    {
      residentId: { type: String, required: true },
      
    }
  ]
});

const serviceStaffSchema = mongoose.Schema({
  serviceStaffId: { type: String, required: true, index: true },
  workerName: { type: String, required: true, index: true },
  flat: { type: String, required: true },
  category: { type: String, required: true },
  entryTime: { type: String, required: true },
  locationStatus: { type: String, default: "inside" }
});

const residentNotificationsSchema = new mongoose.Schema({
  residentId: { type: String, required: true, unique: true },
  notifList: [
    {
      name: { type: String, required: true },          // e.g. "Sunita"
      category: { type: String, required: true },          // e.g. "maid", "visitor", "driver", "plumber"
      entryTime: { type: "String", },    // when the entry happened
      
    }
  ],
  others:{default:[]}
});



const Resident = mongoose.model("Residents", residentSchema);
const ResidentRequest = mongoose.model("VisitorRequest2Resident", visitorRequestSchema);
const Worker2Resident = mongoose.model("Worker2Resident", worker2ResidentSchema);
const ResidentNotifications = mongoose.model("ResidentNotifications", residentNotificationsSchema);
const ServiceStaff = mongoose.model("ServiceStaff", serviceStaffSchema);

module.exports = {
  Resident,
  ResidentRequest,
  Worker2Resident,
  ResidentNotifications,
  ServiceStaff  
};

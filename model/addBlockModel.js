const { default: mongoose } = require("mongoose");



const blockSchema = new mongoose.Schema({
    societyId:{type:String,required:true},
    blockName:{type:String,required:true},

})

module.exports = mongoose.model('Block',blockSchema)
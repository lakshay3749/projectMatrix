const Block = require("../model/addBlockModel");


exports.addBlockController = async (req,res,next)=>{

    const {societyId,blockName} = req.body

    const block = new Block({societyId,blockName});  // collection name

    try {
        const res = block.save()
        console.log(res,"successfulll")
        res.status(200).json({ message: "Data received successfully!"})
        
        next()
    } catch (error) {
        console.log(error.errors,"someerror comes")
    }
}
const express = require('express')
const bodyParser = require('body-parser')
// const path = require('path')
const cors = require('cors')
const { default: mongoose } = require('mongoose');
const { homeRoute } = require('./routes/homeRouter');
const { passRoute } = require('./routes/passRouter');
const { vehicleRoute } = require('./routes/vehicleRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use(vehicleRoute)

app.use(homeRoute)  
console.log("Hello Saint")
app.use(passRoute);



const DB_PATH = 'mongodb+srv://lakshay9763:fbic1412@cluster0.df3xv84.mongodb.net/Passes?retryWrites=true&w=majority';



mongoose.connect(DB_PATH).then(()=>{
    console.log("Connection to Mongo Successfull...")

     app.listen(3000, "0.0.0.0", (err) => {
       console.log("Server is running ...")
     })

}).catch((err)=>{
    console.log(err,"err comes")
})
const express = require('express')
const bodyParser = require('body-parser')

const {Server} = require('socket.io')
const http = require('http')

const cors = require('cors')
const { default: mongoose } = require('mongoose');
const { homeRoute } = require('./routes/homeRouter');
const { passRoute } = require('./routes/passRouter');
const { vehicleRoute } = require('./routes/vehicleRoute');
const { residentRoute } = require('./routes/residentRouter');
const { initSocket } = require('./socket')
const { guardRoute } = require('./routes/guardRouter')



const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

// app.use(vehicleRoute)
// app.use(homeRoute)  


app.use(passRoute);

app.use(residentRoute) // opening resident route 

app.use('/guard',guardRoute)




const DB_PATH = process.env.DB_PATH;

const PORT = process.env.PORT || 3000


mongoose.connect(DB_PATH).then(()=>{
    console.log("Connection to Mongo Successfull...")

    const server = http.createServer(app)

    initSocket(server);


     server.listen(PORT, "0.0.0.0", (err) => {
       console.log("Server is running ...")
     })

}).catch((err)=>{
    console.log(err,"err comes")
})

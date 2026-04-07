
const { Server } = require("socket.io");

let io

// mapping object
const guardSockets = {}; 
// {
//   Guard-01 : socketId123,
//   Guard-02 : socketId456
// }



const initSocket = (server)=>{


    io = new Server(server,{
    cors:{origin:"*"}
  });

  io.on("connection",(socket)=>{

    console.log("User connected:",socket.id);


    socket.on("registerGuard",(guardId)=>{
        guardSockets[guardId] = socket.id

        console.log("Guard Registered:",guardId);
        console.log(guardSockets)
    })

    

    socket.on("dissconnect",()=>{
        console.log("Disconnected:",socket.id);
    })

  })
}


const getIO = ()=> io;
const getGuardSocketId = (guardId)=> guardSockets[guardId];

module.exports = { initSocket, getIO, getGuardSocketId };
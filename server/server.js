const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const port = 3000
const publicpath = path.join(__dirname ,"/../public")


var {generateMessage,generateLocationMessage}=  require('./utils/message')

var app = express()
var server = http.createServer(app)
var io = socketIO(server);


app.use(express.static(publicpath))

io.on('connection',(socket)=>{




    console.log('New User connected');
    socket.emit("newMessage",generateMessage("admin","hello here..................."))
    socket.broadcast.emit("newMessage",generateMessage("admin","new on join"));

    socket.on('disconnect',()=>{
        console.log('client is disconnected')
    })
  
    socket.on('createMessage', function (msg,callback){
        //console.log(msg);
        
        console.log(msg);
        socket.broadcast.emit("newMessage",generateMessage(msg.to,msg.text))
       
       
        //console.log(callback);
      
       callback(generateMessage("Me",msg.text));


    })
    socket.on('userGeolocation', function (locationdata){
        io.emit('newLocationMessage',generateLocationMessage('admine',locationdata.latitude,locationdata.longitude))
        
    })
    
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))


console.log(publicpath);
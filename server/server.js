const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const port = 3000
const publicpath = path.join(__dirname ,"/../public")


var {generateMessage,generateLocationMessage}=  require('./utils/message')
var {Users} = require('./utils/users')
var  {isRealString}  =  require('./utils/validations');

var app = express()
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicpath))

io.on('connection',(socket)=>{




    console.log('New User connected');
    
    socket.on('disconnect',()=>{
        console.log('client is disconnected')

        var user  = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUsreList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('admine',`${user.name} has left`));

        }
    })
    socket.on('join', (params, callback) =>{
        //console.log(params);
        if( !isRealString(params.name) || !isRealString(params.room) ){
            return callback("Name and room is required");
        }
        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name, params.room);
       // console.log(users.getUsreList(params.room));
       //console.log(params.room,'-----------------------------------------------')
       io.to(params.room).emit('updateUserList',users.getUsreList(params.room))


        
        socket.emit("newMessage",generateMessage("admin",`hello here ${params.name}`))
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("admin",`${params.name} is join`));
        callback();
    })
    socket.on('createMessage', function (msg,callback){
        //console.log(msg);
        var user = users.getUser(socket.id);
        //console.log(msg);
        io.to(user.room).emit("newMessage",generateMessage(user.name,msg.text))
       
       
        //console.log(callback);
      
        callback();


    })
    socket.on('userGeolocation', function (locationdata){
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,locationdata.latitude,locationdata.longitude))
        
    })
    
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))


console.log(publicpath);
const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io')
const port = 3000

const publicpath = path.join(__dirname ,"/../public")
var app = express()
var server = http.createServer(app)
var io = socketIO(server);


app.use(express.static(publicpath))

io.on('connection',(socket)=>{
    console.log('New User connected');
    socket.on('disconnect',()=>{
        console.log('client is disconnected')
    })
    socket.on('createEmail',(data)=>{
        console.log(data);
    })

    socket.on('createMessage',(msg)=>{
        console.log(msg);
    })
    socket.emit("newMessage",{
        from :"ma@gmail.com",
        text:"from the server"
    })
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))


console.log(publicpath);
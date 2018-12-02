var socket = io();
socket.on('connect',function(){
    console.log("connected to server");
    socket.emit('createMessage',{
        to :"omar@gmail.com",
        text:"hello"
    });
});
socket.on('disconnect',function(data){
    console.log("sever disconnected");
});

socket.on('newMessage',function(data){
    console.log(data);
});






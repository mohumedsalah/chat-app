var socket = io();
socket.on('connect',function(){
    console.log("connected to server");
    
});
socket.on('disconnect',function(data){
    console.log("sever disconnected");
});

socket.on('newMessage',function(data){
    var li = jQuery(`<li>From ${data.from} : ${data.text}</li>`);
    jQuery('#messages').append(li);
});



jQuery("#message-form").on("submit",function(e){
    e.preventDefault()
    socket.emit('createMessage',{
        to :"User",
        text:jQuery('#txt_message').val()
    },function(data){
        var li = jQuery(`<li>From ${data.from} : ${data.text}</li>`);
        jQuery('#messages').append(li);
    });
});






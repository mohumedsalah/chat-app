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



socket.on('newLocationMessage',function(data){
    var li = jQuery(`<li>From:${data.from} <a href=${data.url} >Location of user </a> </li>`);
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
        jQuery('#txt_message').val('');
    });
});


var locationBtn = jQuery('#send-location')
locationBtn .on('click',function(){
    if(!navigator.geolocation){
        return alert("geolocation is not support by your browser");
    }
    locationBtn.attr("disabled","disabled").text("sending");
    navigator.geolocation.getCurrentPosition(function(pos){
        locationBtn.removeAttr("disabled").text("send location");
        socket.emit('userGeolocation',{
            latitude:pos.coords.latitude,
            longitude:pos.coords.longitude
        })
        //console.log(pos.coords.latitude,"        ",pos.coords.longitude);
    },function(){
        locationBtn.removeAttr("disabled").text("send location");
        alert("unable to reach to your location")
    })
 })







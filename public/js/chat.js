var socket = io();

function scrolldown(){
    //selectors
    var messages =  jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    //height calc
    var clientHeight = messages.prop('clientHeight');
    var scrollTop =  messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
       messages.scrollTop(scrollHeight); 
    }
}


socket.on('connect',function(){
    console.log("connected to server");
    
});
socket.on('disconnect',function(data){
    console.log("sever disconnected");
});

socket.on('newMessage',function(data){

    var datecomming = moment(data.createdAt).format('h:mm a');
    var template =  jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text:data.text,
        from:data.from,
        createdAt:datecomming
    });
    jQuery('#messages').append(html);
    scrolldown();
    // var datecomming = moment(data.createdAt).format('h:mm a');
    // var li = jQuery(`<li>From ${data.from} ${datecomming} : ${data.text}</li>`);
    // jQuery('#messages').append(li);
});



socket.on('newLocationMessage',function(data){

    var datecomming = moment(data.createdAt).format('h:mm a');
    var template =  jQuery('#message-location-template').html();
    var html = Mustache.render(template,{
        url:data.url,
        from:data.from,
        createdAt:datecomming
    });
    jQuery('#messages').append(html);
    scrolldown();
    // var datecomming = moment(data.createdAt).format('h:mm a');
    // var li = jQuery(`<li>From:${data.from} ${datecomming} <a href=${data.url} >Location of user </a> </li>`);
    // jQuery('#messages').append(li);
});



jQuery("#message-form").on("submit",function(e){
    e.preventDefault()
    socket.emit('createMessage',{
        to :"User",
        text:jQuery('#txt_message').val()
    },function(data){
        var datecomming = moment(data.createdAt).format('h:mm a');
        var template =  jQuery('#message-template').html();
        var html = Mustache.render(template,{
            text:data.text,
            from:data.from,
            createdAt:datecomming
        });
        jQuery('#txt_message').val("")
        jQuery('#messages').append(html);
        scrolldown();
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







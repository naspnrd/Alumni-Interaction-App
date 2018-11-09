var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); //passing http to the constructor of the socket
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
//add a connection
io.on('connection',function(socket){
    console.log('one user connected..' +socket.id);//every user has id and it connects to it
    //now listen to the corresponding event on backend
    socket.on('message',function(data){
       var sockets = io.sockets.sockets;
       sockets.forEach(function(sock){
           if(sock.id != socket.id)
           {
               sock.emit('message',{message:data});
           }
       })
        //socket.emit('message',{message:data});// to display data to other devices connected to same server
       // console.log(data);//data sent from client side
    })
    socket.on('disconnect',function(){
        console.log('one user disconnected' +socket.id);
    })
});

http.listen(4000,function() {
    console.log('server listenning on port 4000');
});
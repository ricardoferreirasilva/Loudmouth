var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3563, () => console.log('Loudmouth sockets *:3563'));

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('create', function (room) {
        console.log("A user has joined: " + room);
        socket.join(room);
  });
  socket.on('message', function (room,data) {
     console.log(room + " " + data);
     websocket.to(room).emit('message',data);
  });
});
// socket.broadcast.emit('message', message);

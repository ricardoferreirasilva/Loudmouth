var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'loudmouth'
});
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3563, () => console.log('Loudmouth sockets *:3563'));

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  //console.log('A client just joined on', socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('join', function (room,tk) {
      console.log("joining room");
        socket.join(room);
      console.log("joined room");
        connection.query('SELECT * from user where token = ?',[tk],function(error, results, fields) {
          if (error || results.length == 0) {
            console.log("Error");
          }
          else
          {
            console.log("sUCESS");
            var username = results[0].user_name; 
            var msg = username + " has joined the chatroom.";
            websocket.to(room).emit('message',msg);
          }
        });
  });
 socket.on('message', function (room,data,tk) {
    //console.log(name+ " on room: "+room+" said: "+data);
    connection.query('SELECT * from user where token = ?',[tk],function(error, results, fields) {
      if (error || results.length == 0) {
        console.log("Error")
      }
      else
      {
        var username = results[0].user_name; 
        var msg = username + " : "+data;
        websocket.to(room).emit('message',msg);
      }
    });
  });
});
// socket.broadcast.emit('message', message);
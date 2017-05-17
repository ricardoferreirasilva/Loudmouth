var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mysql      = require('mysql');
var randtoken = require('rand-token');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin', //your mysql password here
  database : 'loudmouth'
});
var passwordHash = require('password-hash');

// server dont stop when internal server error occur.
process.on('uncaughtException', function(err) {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3561, function () {
    console.log('Loudmouth: 3561');
});
app.use(tokenChecker);
function tokenChecker(req, res, next) {
    if(req.url == "/login" || req.url == "/register") next();
    else
    {
        var token = req.body.token;
        connection.query('SELECT * from user where token = ?',[token],function(err, rows, fields)
        {
          if (!err)
          {
            if(rows.length > 0)
            {
                //Token is valid.
                next();
            }
          }
          else
          {
              console.log('Error while performing Query.');
          }
        });
    }
}
app.post('/register', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    console.log("User registering...");
    console.log(email + " " + firstname + " " + lastname + " " + password);

    var hash = passwordHash.generate(password);
    var query = connection.query('INSERT INTO user (user_name,first_name,last_name,password) VALUES (?,?,?,?)', [email,firstname,lastname,hash], function (error, results, fields) {
        if (error){
            res.sendStatus(500);
            throw error;
        }
        else {
            console.log("Register sucessfull.");
            res.sendStatus(200);
        }
    });
});
app.post('/login', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var query = connection.query('SELECT * FROM user WHERE user_name = ?', [email], function (error, results, fields) {
        if (error){
            res.sendStatus(500);
            throw error;
        }
        else {
            if(results.length > 0)
            {
                var tk = randtoken.generate(16);
                var response = {token: tk};
                if(passwordHash.verify(password,results[0].password))
                {
                        connection.query('UPDATE user SET token = ? WHERE user_name = ?', [tk,email], function (error, results, fields) {
                        if (error){
                            res.sendStatus(500);
                            throw error;
                        }
                        else {
                            console.log("Login sucessfull.");
                            res.send(JSON.stringify(response));
                        }
                    });
                }
            }
        }
    });
});
app.post('/getInvites', function (req, res) {
    console.log("get invites request.");
    var tk = req.body.token;
    var inviteeID;
    connection.query('SELECT * from user where token = ?',[tk],function(error, results, fields)
    {
          if (!error && results.length > 0){
                inviteeID = results[0].id;
                var query = connection.query('SELECT user.user_name,chatroom.chat_name,invite.send_date,invite.id FROM user,invite,chatroom WHERE invite.invitee = ? AND invite.chat_room = chatroom.id AND user.id = invite.inviter', [inviteeID], function (error, results, fields) {
                if (error){
                    res.sendStatus(500);
                    throw error;
                }
                else {
                    res.send(results);
                }
              });
          }
          else console.log('Error while performing Query.');
    });
});
app.post('/rejectInvite', function (req, res) {
    console.log("Reject Invite");
    var chatID = req.body.chatID;
    connection.query('DELETE FROM invite WHERE id = ?',[chatID],function(error, results, fields)
    {
          if (!error){
               res.sendStatus(200);
          }
          else throw error;
    });
});
app.post('/acceptInvite', function (req, res) {
    console.log("Accept Invite");
    var inviteID = req.body.chatID;
    connection.query('SELECT chatroom.id,invite.invitee FROM chatroom,invite WHERE invite.chat_room = chatroom.id AND invite.id = ?',[inviteID],function(error, results, fields)
    {
          if (!error){
               var chatID = results[0].id;
               var inviteeID = results[0].invitee;
               connection.query('DELETE FROM invite WHERE id = ? OR chat_room = ?',[inviteID,chatID],function(error, results, fields)
                {
                    if (!error){
                        var query = connection.query('INSERT INTO userchat (chat_room,user) VALUES (?,?)', [chatID,inviteeID], function (error, results, fields) {
                            if (error){
                                res.sendStatus(500);
                                throw error;
                            }
                            else {
                                res.sendStatus(200);
                            }
                        });
                    }
                    else throw error;
                });
          }
          else throw error;
    });
});
app.post('/getChats', function (req, res) {
  console.log("get chats request.");
  var tk = req.body.token;
  connection.query('SELECT * from user where token = ?',[tk],function(error, results, fields)
  {
        if (!error && results.length > 0){
              var userID = results[0].id;
              console.log(userID);
              var query = connection.query('SELECT chatroom.chat_name,chatroom.id FROM userchat,chatroom WHERE userchat.user = ? AND userchat.chat_room = chatroom.id', [userID], function (error, results, fields) {
              if (error){
                  res.sendStatus(500);
                  throw error;
              }
              else {
                  res.send(results);
                  console.log(results);
              }
            });
        }
        else console.log('Error while performing Query.');
  });
});

app.post('/leaveChat', function (req, res) {
    //TODO: funcao que sai do chat.
});

app.post('/createChannel', function (req, res) {
  console.log("create channel request.");

  var tk = req.body.token;
  var channelName = req.body.channelName;
  var userID;
  var chatroomID;

  connection.query('SELECT * from user where token = ?',[tk],
  function(error, results, fields) {
    if (!(!error && results.length > 0)) {
      res.sendStatus(500);
      throw error;
    }

    userID = results[0].id;
    connection.query('INSERT INTO chatroom (creator_id,chat_name) VALUES (?,?)',[userID, channelName],
    function (error, results, fields) {
      if (error){
        res.sendStatus(500);
        throw error;
      }

      connection.query('SELECT * FROM chatroom WHERE creator_id = ? AND chat_name = ?', [userID, channelName],
      function (error, results, fields) {
          if (error) {
            res.sendStatus(500);
            throw error;
          }

          chatroomID = results[0].id;
          connection.query('INSERT INTO userchat (chat_room,user) VALUES (?,?)', [chatroomID, userID],
          function (error, results, fields) {
              if (error) {
                res.sendStatus(500);
                throw error;
              }

              res.sendStatus(200);
              console.log("Channel created.");
          });
      });
    });
  });
});

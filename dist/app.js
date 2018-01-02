"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
// import * as mongodb from 'mongodb';
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var validator = require("express-validator");
var user_1 = require("./controllers/user");
var sio = require("socket.io");
//server use
var url = 'mongodb://localhost:27017/chat';
var app = express();
// const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
mongoose.Promise = global.Promise; //Overwrite mongoose promise
//DB connection
mongoose.connect(url).then(function () {
    console.log("connection with db stablished");
    var myUser = new user_1.User();
    app.get('/users', myUser.getAll); //all users
    app.post('/signup', myUser.signup);
    app.post('/login', myUser.login);
    app.get('/profile', myUser.profile);
    app.post('/user/conversations', myUser.conversations);
    app.post('/user/friendlist', myUser.friendlist);
    app.post('/conversation/sendmessage', myUser.sendMessage);
    app.delete('/deleteuser', myUser.delete);
    app.delete('/deleteconversation', myUser.delete);
    app.post('/user/acceptfriendrequest', myUser.acceptFriendRequest);
    app.get('/user/friendrequestlist', myUser.friendRequestList);
    app.post('/user/sendfriendrequest', myUser.sendFriendRequest);
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}).catch(function (e) { console.error(e); });
//Create and boot server
app.set('port', 3000);
var server = http.createServer(app);
var io = sio.listen(server);
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
var boot = function () {
    server.listen(app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    }));
};
boot();
//# sourceMappingURL=app.js.map
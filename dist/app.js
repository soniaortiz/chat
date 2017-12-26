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
    app.post('/profile', myUser.profile);
    app.post('/user/conversations', myUser.conversations);
    app.post('/user/friendlist', myUser.friendlist);
    app.post('/conversation/sendmessage', myUser.sendMessage);
    // app.get('/deleteusers', (req, res, next)=>{
    //     User.find({},(users)=>{
    //         res.send(users)
    //         // console.log(users)
    //     }).then((users)=>{
    //         users.forEach((user, i)=>{
    //             console.log("usuario ", i, " : ", user)
    //             users[i].remove();
    //         })
    //     })
    // });
    // app.post('/user/sendmessage', (req, res, next)=>{
    //     let theMessage = new Message({
    //         messageContent: req.body.messageContent,
    //         sender: req.body.sender,
    //         receiver: req.body.receiver}).save().then(
    //         (m)=>{//after the message is created then the reference is passed to the conversation
    //             Conversation.findById({_id: req.body.conversation_id}).update({$push: {messages: m._id}})
    //             .then(()=>res.send(200))
    //         }
    //     );
    // });
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}).catch(function (e) { console.error(e); });
//Create and boot server
app.set('port', 3000);
var server = http.createServer(app);
var boot = function () {
    server.listen(app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    }));
};
boot();
//# sourceMappingURL=app.js.map
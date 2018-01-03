"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var validator = require("express-validator");
var routes = require("./controllers/routes");
//server use
var url = 'mongodb://localhost:27017/chat';
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
mongoose.Promise = global.Promise; //Overwrite mongoose promise
//DB connection
mongoose.connect(url).then(function () {
    console.log("connection with db stablished");
    // const myUser = new User();
    // const myConversation = new Conversation();
    // const myMessage = new Message();
    app.get('/users', routes.user.getAll); //all users
    app.post('/signup', routes.user.signup);
    app.post('/login', routes.user.login);
    app.post('/logout', routes.user.logout);
    app.get('/profile', routes.user.profile);
    // app.post('/user/conversations', myUser.conversations);
    // app.post('/user/friendlist', myUser.friendlist);
    app.post('/conversation/sendmessage', routes.user.sendMessage);
    app.delete('/deletecontact', routes.user.deleteContact);
    app.delete('/deleteconversation', routes.user.delete);
    app.post('/user/acceptfriendrequest', routes.user.acceptFriendRequest);
    // app.get('/user/friendrequestlist', myUser.friendRequestList);
    app.post('/user/sendfriendrequest', routes.user.sendFriendRequest);
    // app.get('/allconversations', myConversation.getAll)
    app.get('/conversations/:_id', routes.conversation.getConversation);
    app.post('/user/conversations/sendmessage', routes.conversation.sendMessage);
    // app.get('/deleteallconversations', myConversation.delete);
    // app.get('/getallmessages', myMessage.getAll);
    app.get('/deletenullconversation', routes.conversation.findnull);
    // app.get('/conversationscount', myConversation.count);
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
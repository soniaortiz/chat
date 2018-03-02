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
var passport_jwt_1 = require("passport-jwt");
var passport = require("passport");
var userSchema_1 = require("./models/userSchema");
var cookieParser = require("cookie-parser");
var SocketIO = require("socket.io");
var sockets_1 = require("./sockets");
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    // console.log('token: ', token);
    return token;
};
var opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_TOKEN
};
// server use
var url = 'mongodb://localhost:27017/chat';
var app = express();
app.use(express.static(path.join(__dirname, '../build/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
app.use(cookieParser());
passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    // console.log('In jwt strategy ', jwt_payload);
    userSchema_1.UserModel.findOne({ _id: jwt_payload._id }, ('-password '))
        .then(function (user) {
        !user && done(null, false);
        done(null, user);
    })
        .catch(function (e) { return done(e, false); });
}));
app.use(passport.initialize());
mongoose.Promise = global.Promise; // Overwrite mongoose promise
// DB connection
mongoose.connect(url).then(function () {
    // console.log("connection with db stablished");
    app.get('/users', routes.user.getAll);
    app.post('/signup', routes.user.signup);
    app.post('/login', routes.user.login);
    app.use(passport.authenticate('jwt', { session: false }));
    app.post('/profile', routes.user.profile);
    app.post('/friendlist', routes.user.friendlist);
    app.post('/conversations', routes.user.conversations);
    app.post('/conversation/sendmessage', routes.user.sendMessage);
    app.delete('/deletecontact', routes.user.deleteContact);
    app.delete('/deleteconversation', routes.user.delete);
    app.post('/acceptfriendrequest', routes.user.acceptFriendRequest);
    app.post('/sendfriendrequest', routes.user.sendFriendRequest);
    app.get('/conversations/:_id', routes.conversation.getConversation);
    app.post('/user/conversations/sendmessage', routes.conversation.sendMessage);
    app.get('/deletenullconversation', routes.conversation.findnull);
    app.get('/findUsers', routes.user.findUsers);
    app.post('/rejectContactRequest', routes.user.rejectContactRequest);
    app.post('/logout', routes.user.logout);
    // app.post('/updateContactRequests', routes.user.updateContacRequests);
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
}).catch(function (e) { console.error(e); });
// Create and boot server
app.set('port', 8000);
var server = http.createServer(app);
var boot = function () {
    server.listen(app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    }));
    sockets_1.sockets();
};
exports.io = SocketIO(server);
exports.nspUser = exports.io.of('/user');
boot();
//# sourceMappingURL=app.js.map
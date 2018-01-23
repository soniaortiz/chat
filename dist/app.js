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
// const cookieExtractor = (req: {cookies: string})=>{
//     let token = null;
//     if(req && req.cookies){
//         token = req.cookies['jwt']
//     }
//     return token;
// }
var opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN
};
console.log("opts.secretOrKey**************", opts.secretOrKey);
//server use
var url = 'mongodb://localhost:27017/chat';
var app = express();
app.use(express.static(path.join(__dirname, '../build/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
app.use(cookieParser());
passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    console.log("****JWT**** :");
    userSchema_1.UserModel.findOne({ _id: jwt_payload._id })
        .then(function (user) {
        !user && done(null, false);
        done(null, user);
    })
        .catch(function (e) { return done(e, false); });
}));
app.use(passport.initialize());
mongoose.Promise = global.Promise; //Overwrite mongoose promise
//DB connection
mongoose.connect(url).then(function () {
    // console.log("connection with db stablished");
    app.post('/signup', routes.user.signup);
    app.post('/login', routes.user.login);
    app.post('/logout', routes.user.logout);
    app.use(passport.authenticate('jwt', { session: false }));
    app.post('/profile', routes.user.profile);
    app.get('/users', routes.user.getAll);
    app.post('/conversation/sendmessage', routes.user.sendMessage);
    app.delete('/deletecontact', routes.user.deleteContact);
    app.delete('/deleteconversation', routes.user.delete);
    app.post('/user/acceptfriendrequest', routes.user.acceptFriendRequest);
    app.post('/user/sendfriendrequest', routes.user.sendFriendRequest);
    app.get('/conversations/:_id', routes.conversation.getConversation);
    app.post('/user/conversations/sendmessage', routes.conversation.sendMessage);
    app.get('/deletenullconversation', routes.conversation.findnull);
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
}).catch(function (e) { console.error(e); });
//Create and boot server
app.set('port', 8000);
var server = http.createServer(app);
var boot = function () {
    server.listen(app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    }));
};
boot();
//# sourceMappingURL=app.js.map
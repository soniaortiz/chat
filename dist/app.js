"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var validator = require("express-validator");
var models_1 = require("./models/models");
//server use
var url = 'mongodb://localhost:27017/chat';
var app = express();
var port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(errorHandler());
mongoose.Promise = global.Promise; //Overwrite mongoose promise
//DB connection
mongoose.connect(url).then(function () {
    console.log("connection with db stablished");
    app.post('/login', function (req, res, next) {
        models_1.User.findOne({ email: req.body.email }).then(function (doc) {
            console.log("User found ", doc);
            res.send(doc);
        }).catch(function (e) {
            console.log("User not found");
        });
    });
    app.post('/signup', function (req, res, next) {
        // console.log("Register user", req.body);
        var user = new models_1.User(req.body).save()
            .then(function (user) {
            console.log("request", user);
            res.send(user);
        }).catch(function (e) { return console.error(e); });
    });
    app.get('/user', function (req, res, next) {
        console.log("User profile");
        if (req.query._id.length != 24)
            res.status(404).send("Invalid id");
        models_1.User.findById(req.query._id)
            .then(function (user) {
            console.log(user);
            !user ? res.status(404).send("User not found") :
                (console.log("this is my profile", user),
                    res.send(user));
        });
    });
    app.get('user/conversations', function (req, res, next) {
        console.log("Serving conversations");
        models_1.User.findById(req.query._id)
            .then(function (user) {
            !user && res.send(404).send('User not found');
            console.log("Sending conversations");
            models_1.Conversation.find()
                .then(function (conversations) {
                res.send(conversations); //will send all conversations of the user
            });
        });
    });
    app.get('user/conversations/:_id', function (req, res, next) {
        console.log("Serving conversation");
        models_1.Conversation.findById(req.body._id)
            .then(function (conversation) {
            // !conversation && res.send(404);
            res.send(conversation);
        });
    });
    app.get('user/addcontact', function (req, res, next) {
        //create conversation when accepted
        //pass the id of contact that want to add
        res.send(200);
    });
    app.get('/user/aceptfriendrequest', function (req, res, next) {
        var conversation = new models_1.Conversation({ name: 'test' }).save()
            .then(function (conversation) {
            models_1.User.findById(req.query.user_id)
                .update({ $push: { contacts: req.query.request_user_id, conversations: conversation._id } }) //adds contact and create conversation
                .then(function (updatedUser) {
                models_1.Conversation.findById(conversation._id).update({ $push: { participants: [req.query.user_id, req.query.request_user_id] } }); //adds participants to the conversation
                models_1.User.findById(req.query.request_user_id).update({ $push: { contacts: req.query.user_id, conversations: conversation._id } })
                    .then(function () {
                    res.send(updatedUser);
                });
            }).catch(function (e) {
                res.send(e);
            });
        });
    });
    app.get('/users', function (req, res, next) {
        models_1.User.find()
            .then(function (users) {
            res.send(users);
        });
    });
    app.get('/deleteusers', function (req, res, next) {
        models_1.User.find({}, function (users) {
            res.send(users);
            // console.log(users)
        }).then(function (users) {
            users.forEach(function (user, i) {
                console.log("usuario ", i, " : ", user);
                users[i].remove();
            });
        });
    });
    app.post('/user/message', function (req, res, next) {
        var theMessage = new models_1.Message(req.body).save().then(function (m) {
            res.send(m._id);
        });
    });
    app.get('/user/sendmessage', function (req, res, next) {
        models_1.Conversation.findById({ _id: req.query.conversation_id }).update({ $push: { messages: req.query.message_id } }).then(function () {
            res.send(200);
        });
    });
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

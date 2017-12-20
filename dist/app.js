"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var validator = require("express-validator");
var schema_1 = require("./schema");
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
    app.get('/', function (req, res, next) {
        console.log("Send response");
        // User.create
        res.send();
    });
    app.get('/login', function (req, res, next) {
        console.log("login");
        console.log("Env port: ", process.env.PORT);
        // console.log(req.query);
        res.send('route with react');
    });
    app.post('/login', function (req, res, next) {
        // console.log(req.body);
        schema_1.User.findOne({ email: req.body.email }).then(function (doc) {
            console.log(doc);
        }).catch(function (e) {
            console.log("User not found");
        });
        res.send("found");
    });
    app.post('/singin', function (req, res, next) {
        console.log("Register user");
        schema_1.User.collection.insert(req.body.email).then(function () {
            console.log("request", req.body);
            res.send("inserted");
        }).catch(function (e) { return console.error(e); });
    });
    app.get('/me', function (req, res, next) {
        console.log("My profile");
        schema_1.User.collection.findOne({}).then(function () { return console.log("this is my profile"); });
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

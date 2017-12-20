"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var app = express();
var url = 'mongodb://localhost:27017/chat';
var port = 3000;
mongoose.connect(url).then(function () {
    console.log("connection with db stablished");
})["catch"](function (e) { console.error(e); });
app.set('port', 3000);
app.get('/', function (res, req, next) {
    console.log('res');
});
app.get('/login', function () {
    console.log('display login');
});
var server = http.createServer(app);
var boot = function () {
    server.listen(app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    }));
};
boot();

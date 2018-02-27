"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
function sockets() {
    console.log('in server sockets: **********************************************************');
    app_1.nsp.on('connection', function (socket) {
        console.log('someone connected');
        socket.on('a', function (data) {
            console.log('The data *****^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', data);
        });
    });
}
exports.sockets = sockets;
//# sourceMappingURL=sockets.js.map
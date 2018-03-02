"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
function sockets() {
    console.log('in server sockets: **********************************************************');
    // tslint:disable-next-line:no-any
    app_1.nspUser.on('connection', function (client) {
        console.log('someone connected');
        // client.on('send contact request', (user: { user: string }) => {
        //     console.log('The data *****^^^^^^^^^^^^^^^^^^^^^^^^^^^', user);
        // });
        client.on('joinUserSocket', function (email) {
            console.log('aaaaaa' + email + ' joined');
            client.join(email);
            client.emit('msg', 'chat, after joining room: ' + email);
        });
    });
}
exports.sockets = sockets;
//# sourceMappingURL=sockets.js.map
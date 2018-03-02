import { io, nspUser } from './app';

export function sockets() {
    console.log('in server sockets: **********************************************************');
    // tslint:disable-next-line:no-any
    nspUser.on('connection', function (client: SocketIO.Socket) {
        console.log('someone connected');
        // client.on('send contact request', (user: { user: string }) => {
        //     console.log('The data *****^^^^^^^^^^^^^^^^^^^^^^^^^^^', user);
        // });

        client.on('joinUserSocket', (email) => {
            console.log('aaaaaa' + email + ' joined');
            client.join(email);
            client.emit('msg', 'chat, after joining room: ' + email);
        });
    });

}

import { io, nspUser, nspConversation } from './app';
import { Conversation } from './controllers/conversation';
import { conversation } from './controllers/routes';

export function sockets() {
    console.log('in server sockets: **********************************************************');
    // tslint:disable-next-line:no-any
    nspUser.on('connection', function (client: SocketIO.Socket) {
        console.log('someone connected');
        client.on('joinUserSocket', (email) => {
            // console.log('aaaaaa' + email + ' joined');
            client.join(email);
            client.emit('msg', 'chat, after joining room: ' + email);
        });
    });

    nspConversation.on('connection', (client: SocketIO.Socket) => {
        client.on('join conversations', (conversations) => {
            // console.log()
            Object.keys(conversations).forEach((cnv: string) => {
                client.join(cnv);
            });
        });
    });

}

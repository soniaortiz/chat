import * as io from 'socket.io-client';
export const socket = io('http://localhost:8000'); // flag to connect 
// it shouln't be connected to the server if there is not user logged.
export const nspUser = io('/user');

export function socketListeners (){
    console.log('Sockets Listeners');
    socket.on('news', function (data: any) {
        console.log('data', data);
        socket.emit('connection', { my: 'data' });
    });

    socket.on('send request', (s: any) => {
        // s.emit('my other event', { my: 'data*/' });
        console.log(s);
    });   
}
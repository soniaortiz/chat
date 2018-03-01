import * as io from 'socket.io-client';
export const socket = io('http://localhost:8000'); // flag to connect 
// it shouln't be connected to the server if there is not user logged.
export const nspUser = io('/user');
import { store } from './App';
import { RequestUserInfoAction } from './store/userActions';


export function socketListeners() {
    console.log('Sockets Listeners');
    // tslint:disable-next-line:no-any
    socket.on('news', function (data: any) {
        console.log('data', data);
        socket.emit('connection', { my: 'data' });
    });

    // tslint:disable-next-line:no-any
    socket.on('send request', (s: any) => {
        // s.emit('my other event', { my: 'data*/' });
        console.log(s);
    });

    nspUser.on('send request', () => {
        console.log('getting request from server');
    });

    nspUser.on('a', (message: string) => {
        console.log("message received: ", message);
    })

    nspUser.on('profile', (data: any) => {
        store.dispatch(RequestUserInfoAction(
            {
                name: data.name,
                middleName: data.middleName,
                lastName: data.lastName,
                email: data.email,
                birthdate: data.birthdate,
                gender: data.gender,
                avatar: data.avatar,
                friendRequests: data.friendRequests,
                contactList: data.contacts,
                conversations: data.conversations
            }));
    });

    nspUser.on('msg', console.log);
}
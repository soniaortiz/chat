import * as io from 'socket.io-client';
export const socket = io('http://localhost:8000'); // flag to connect 
// it shouln't be connected to the server if there is not user logged.
export const nspUser = io('/user');
import { store } from './App';
// import { RequestUserInfoAction } from './store/userActions';
import { updateContactRequestsActionCreator } from './store/appUpdateRequestReducer';

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

    nspUser.on('contact request', (data: Array<string>) => {
        // console.log('message received: ', data);
        // when a new user send a contact request so 
        // it triggers the action to update the requests
        store.dispatch(updateContactRequestsActionCreator(data));
    });

    // nspUser.on('profile', (data: any) => {
    //     console.log('getting profile', data);
    //     // store.dispatch(RequestUserInfoAction(
    //     //     {
    //     //         name: data.name,
    //     //         middleName: data.middleName,
    //     //         lastName: data.lastName,
    //     //         email: data.email,
    //     //         birthdate: data.birthdate,
    //     //         gender: data.gender,
    //     //         avatar: data.avatar,
    //     //         friendRequests: data.friendRequests,
    //     //         contactList: data.contacts,
    //     //         conversations: data.conversations
    //     //     }));
    // });

    nspUser.on('msg', console.log);
}
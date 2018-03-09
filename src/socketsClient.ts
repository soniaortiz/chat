import * as io from 'socket.io-client';
export const socket = io('http://localhost:8000'); // flag to connect 
export const nspUser = io('/user');
export const nspConversation = io('/conversation');
import { PushMessageToConversation } from './store/pushMessageToConversation';
import { store } from './App';
import { updateContactRequestsActionCreator } from './store/appUpdateRequestReducer';

export function socketListeners() {
    // tslint:disable-next-line:no-any
    socket.on('news', function (data: any) {
        // console.log('data', data);
        socket.emit('connection', { my: 'data' });
    });
    // tslint:disable-next-line:no-any
    socket.on('send request', (s: any) => {
        // s.emit('my other event', { my: 'data*/' });
        console.log(s);
    });

    nspUser.on('contact request', (data: Array<string>) => {
        store.dispatch(updateContactRequestsActionCreator(data));
    });

    nspConversation.on('new message', (data: any) => {
        store.dispatch(PushMessageToConversation(data));
    });
}
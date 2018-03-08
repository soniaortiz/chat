import { Dispatch } from 'react-redux';
import request from 'axios';
// import { SEND_MESSAGE } from './actionsTypes';

// const sendMessageAction = (payload: {message: string, conversation_id: string}) => ({
//     type: SEND_MESSAGE,
//     payload
// });

export const SendMessage = (data: {messageContent: string, conversation_id: string}) => {
    return (dispatch: Dispatch<AppStore.Store>) => {
        console.log(data);
        return request.post('/conversation/sendmessage', data)
            .then((status) => {
                console.log(status);
            });
    };
};
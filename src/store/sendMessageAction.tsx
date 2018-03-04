import { Dispatch } from 'react-redux';
import request from 'axios';
// import { SEND_MESSAGE } from './actionsTypes';

// const sendMessageAction = (payload: {message: string, conversation_id: string}) => ({
//     type: SEND_MESSAGE,
//     payload
// });

export const SendMessage = (data: {message: string, conversation_id: string}) => {
    return (dispatch: Dispatch<AppStore.Store>) => {
        return request.post('/conversation/sendmessage', data)
            .then((status) => {
                console.log(status);
            });
    };
};
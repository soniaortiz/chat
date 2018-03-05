import { Dispatch } from 'react-redux';
import request from 'axios';
import { REQUEST_CONVERSATION_MESSAGES } from './actionsTypes';

const RequestConversationsMessages = (payload: any) => ({
    type: REQUEST_CONVERSATION_MESSAGES,
    payload
});

export const RequestConversationMessagesAction = (conversationId: string) => {
    return (dispatch: Dispatch<AppStore.Store>) => {
        return request.post('/messageList', { conversationId }, { withCredentials: true })
            .then(({data}) => {
                console.log('Data: ', data);
                dispatch(RequestConversationsMessages(data));
                console.log('Messages', data);
            })
            .catch((e) => console.log(e));
    };
}
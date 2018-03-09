import { Dispatch } from 'react-redux';
import request from 'axios';
import { REQUEST_CONVERSATION_MESSAGES } from './actionsTypes';

const RequestConversationsMessages = (payload: any) => ({ // Array of Messages
    type: REQUEST_CONVERSATION_MESSAGES,
    payload
});

export const RequestConversationMessagesAction = (conversationId: string) => {
    return (dispatch: Dispatch<AppStore.Store>) => {
        return request.post('/messageList', { conversationId }, { withCredentials: true })
            .then(({ data }) => {
                dispatch(RequestConversationsMessages(data));
            })
            .catch((e) => console.log(e));
    };
};
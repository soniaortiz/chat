import { REQUEST_USER_CONVERSATIONS_LIST } from './actionsTypes';
import { Dispatch } from 'react-redux';
import request from 'axios';

const RequestConversationsList = (payload: AppStore.Conversations) => {
    return {
        type: REQUEST_USER_CONVERSATIONS_LIST,
        payload
    };
};

export const RequestConversations = () => {
    return (dispatch: Dispatch<AppStore.Conversations>) => {
        return request.post('/conversations', { withCredentials: true })
            .then(({ data }) => {
                dispatch(RequestConversationsList(data));
                return true;
            })
            .catch(() => false);
    };
};
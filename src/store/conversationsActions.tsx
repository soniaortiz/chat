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
        return request('/conversations', { withCredentials: true })
            .then(({ data }) => {
                // console.log("Conversations: ", data);
                dispatch(RequestConversationsList(
                    data.map((conversation: any) => ({
                        conversation_id: data._id
                    }))
                ));
                return true;
            })
            .catch(() => false);
    };
};
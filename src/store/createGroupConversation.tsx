import {
    CREATE_GROUP_CONVERSATION,
} from '../store/actionsTypes';
import { Dispatch } from 'react-redux';
import request from 'axios';

const createGroupConversation = (payload: any) => {
    return {
        type: CREATE_GROUP_CONVERSATION,
        payload
    };
};

export const CreateChatGroupAction = (conversationName: string, participants: string []) => {

    return (dispatch: Dispatch<AppStore.User>) => {
        return (
            request.post('/createChatGroup', {conversationName: conversationName, 
                            participants: participants})
                .then((conversation) => {
                    console.log(conversation);
                    dispatch(createGroupConversation(conversation));
                })

        );
    };
};
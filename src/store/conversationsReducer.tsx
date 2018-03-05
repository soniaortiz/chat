import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_CONVERSATIONS_LIST,
    REQUEST_CONVERSATION_MESSAGES,
    PUSH_MESSAGE_TO_CONVERSATION
} from './actionsTypes';

const conversationsData: AppStore.Conversations = [];

type Actions = AppStore.Conversations & Conversation & { _id: string };

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            return (action.payload) ? action.payload : { ...state };
        },
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => {
            const conversations = (state).filter((current) =>
                current._id !== action.payload!._id
            );
            if (action.payload) {
                conversations.push(action.payload);
                return conversations;
            }
            return state;
        },
        [PUSH_MESSAGE_TO_CONVERSATION]: (state, action) => {
            return { ...state };
        }

    },
    conversationsData
);
import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_CONVERSATIONS_LIST,
    REQUEST_CONVERSATION_MESSAGES,
    PUSH_MESSAGE_TO_CONVERSATION
} from './actionsTypes';

const conversationsData: AppStore.Conversations = [];

type Actions = AppStore.Conversations & Conversation & { _id: string } &{message: any};

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            return (action.payload) ? action.payload : { ...state };
        },
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => { // add message to the conversation
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
            // console.log('///THIS IS THE ACTION///', action.payload);
            // console.log('***THIS IS THE STATE***', state);
            // console.log(action.payload!.conversationId);

            const conversation = (state).find((current) =>
                current._id === action.payload!.conversationId
            );
            console.log('conversation ', conversation);
            delete action.payload!.conversationId;
            console.log(action.payload!.message);

            if (action.payload) {
                conversation!.messages.push(action.payload.message);
                // return state;
                // console.log('***THIS IS THE STATE***', state);
                
            }
            const newState = [...state];
            return newState;
        }
    },
    conversationsData
);
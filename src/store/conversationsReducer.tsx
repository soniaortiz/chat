import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_CONVERSATIONS_LIST,
    REQUEST_CONVERSATION_MESSAGES,
    PUSH_MESSAGE_TO_CONVERSATION,
    CLEAR_STATE
} from './actionsTypes';

export const conversationsData: AppStore.Conversations = {};

type Actions = AppStore.Conversations & Conversation & { _id: string } & { message: any } & { conversationId: string }
    & { _id: string, msgs: Array<any> };

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            return (action.payload) ? action.payload : state;
        },
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => { // to get an specific conversation
            const newConversation = {
                ...state[action.payload!._id],
                messages: action.payload!.msgs
            };
            return action.payload
                ? {
                    ...state,
                    [action.payload._id]: newConversation
                }
                : { ...state };
        },
        [PUSH_MESSAGE_TO_CONVERSATION]: (state, action) => {
            const conversationUpdated = {
                ...state[action.payload!.conversationId],
                messages: state[action.payload!.conversationId].messages.push(action.payload!.message)
            };
            console.log('updated: ', conversationUpdated);
            return { ...state };
        },
        [CLEAR_STATE]: (state) => {
            return { ...conversationsData }; // Delete all the state
        }
    },
    conversationsData
);
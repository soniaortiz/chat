import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_CONVERSATIONS_LIST,
    REQUEST_CONVERSATION_MESSAGES,
    PUSH_MESSAGE_TO_CONVERSATION
} from './actionsTypes';

const conversationsData: AppStore.Conversations = {};

type Actions = AppStore.Conversations & Conversation & { _id: string } & { message: any };

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            console.log(state);
            console.log(action.payload);
            return (action.payload) ? action.payload : state;
        },
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => { // to get an specific conversation
            // state[action.payload!.conversation_id].
            // state[action.payload!._id].push(action.payload)
            // const conversations = (state).key((current) =>
            //     current._id !== action.payload!._id
            // );
            // if (action.payload) {
            //     conversations.push(action.payload);
            //     return conversations;
            // }
            return state;
        },
        [PUSH_MESSAGE_TO_CONVERSATION]: (state, action) => {
            if (action.payload) {
                state[action.payload.conversation_id].messages.push(action.payload!.message);
            }
            return state;
        }
    },
    conversationsData
);
import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_CONVERSATIONS_LIST,
    REQUEST_CONVERSATION_MESSAGES,
    PUSH_MESSAGE_TO_CONVERSATION
} from './actionsTypes';

const conversationsData: AppStore.Conversations = {};

type Actions = AppStore.Conversations & Conversation & { _id: string } & { message: any } & { conversationId: string }
    & { _id: string, msgs: Array<any> };

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            // console.log(state);
            // console.log(action.payload);
            return (action.payload) ? action.payload : state;
        },
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => { // to get an specific conversation
            // console.log('PAYLOAD---->', action.payload);
            // console.log('state------->', state);
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
            console.log('PAYLOAD---->', action.payload!.message);
            console.log('state------->', state);

            const conversationUpdated = {
                ...state,
                ...state[action.payload!.conversationId],
                messages: state[action.payload!.conversationId].messages.push(action.payload!.message)
            };
            console.log('updated: ', conversationUpdated);

            // return action.payload ? 
            // {
            //     ...state,
            //     [action.payload.conversationId]: {...conver}
            // } : 
            // { ...state };
            return { ...state };

        }
    },
    conversationsData
);
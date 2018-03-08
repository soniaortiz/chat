import { handleActions } from 'redux-actions';
import { REQUEST_CONVERSATION_MESSAGES } from './actionsTypes';

const conversationsData = {};

export const Reducer = handleActions<any, any>(
    {
        [REQUEST_CONVERSATION_MESSAGES]: (state, action) => {
            console.log('in the action: {}', action.payload);
            return action.payload;
        }
        // [PUSH_MESSAGE_TO_CONVERSATION]: (state, action) => {
        //     console.log('///THIS IS THE ACTION///', action.payload);
        //     console.log('***THIS IS THE STATE***', state);
        //     // console.log(action.payload!.conversationId);

        //     const conversation = (state).find((current) =>
        //         current._id === action.payload!.conversationId
        //     );
        //     // console.log(conversation);
        //     delete action.payload!.conversationId;
        //     // console.log(conversation);

        //     if (action.payload) {
        //         conversation!.messages.push(action.payload);
        //         // return state;
        //     }
        //     return state;
        // }
    },
    conversationsData
);

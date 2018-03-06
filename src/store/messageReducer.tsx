// // // import { handleActions } from 'redux-actions';
// // // import { PUSH_MESSAGE_TO_CONVERSATION } from './actionsTypes';

// // const conversationsData: AppStore.Conversations = [];

// export const Reducer = handleActions<AppStore.Conversations, AppStore.Messages & { conversationId: string }>(
//     {
//         [PUSH_MESSAGE_TO_CONVERSATION]: (state, action) => {
//             console.log('///THIS IS THE ACTION///', action.payload);
//             console.log('***THIS IS THE STATE***', state);
//             // console.log(action.payload!.conversationId);

//             const conversation = (state).find((current) =>
//                 current._id === action.payload!.conversationId
//             );
//             // console.log(conversation);
//             delete action.payload!.conversationId;
//             // console.log(conversation);

//             if (action.payload) {
//                 conversation!.messages.push(action.payload);
//                 // return state;
//             }
//             return state;
//         }
//     },
//     conversationsData
// );

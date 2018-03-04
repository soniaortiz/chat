// import { Dispatch } from 'react-redux';
// import { REQUEST_CONVERSATIONS } from './actionsTypes';
// import request from 'axios';
// const RequestConversationsCreator = (payload: Array<any>) => {
//     return ({
//         type: REQUEST_CONVERSATIONS,
//         payload
//     });
// };

// export const RequestConversationsThunk = () => {
//     return (dispatch: Dispatch<AppStore.Conversations>) => {
//         // return dispatch(RequestConversationsActionCreator)
//         request.post('/conversations', { withCredentials: true })
//             .then((conversationsArray) => {
//                 console.log(conversationsArray);
//                 // will dispatch the reques conversations creator 
//             })
//             .catch((e) => console.log(e));
//     };
// };
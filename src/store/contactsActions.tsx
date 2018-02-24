// import { REQUEST_USER_CONTACT_LIST } from './actionsTypes';
// import { Dispatch } from 'react-redux';
// import * as axios from 'axios';
// const request = axios.default;

// const RequestContactlist = (payload: any) => {
//     return {
//         type: REQUEST_USER_CONTACT_LIST,
//         payload
//     };
// };

// export const RequestContacts = () => {
//     return (dispatch: Dispatch<AppStore.contacts>) => {
//         // return 
//         request.post('/friendlist', { withCredentials: true })
//             .then(({ data }) => {
//                 console.log('contacts: ', data);
//                 dispatch(RequestContactlist(
//                     data.map((user: any) => ({
//                         contact_id: user._id,
//                         contactName: user.name
//                     }))
//                     // data
//                 ));
//                 return true;
//             }
//         )
//             .catch(() => false);
//     };
// };
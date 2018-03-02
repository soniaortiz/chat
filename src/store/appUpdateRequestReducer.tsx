// import { Dispatch } from 'react-redux';
import { UPDATE_CONTACT_REQUESTS } from './actionsTypes';
// import { Dispatch } from 'react-redux';

export const updateContactRequestsActionCreator = (payload: Array<string>) => {
    console.log('dipatching the update');
    return {
        type: UPDATE_CONTACT_REQUESTS,
        payload: {friendRequests: payload}
    };
};

// export const updateContactRequestsAction = () => {
//     return (dispatch: Dispatch<AppStore.app>) => {
//         return dispatch(updateContactRequestsActionCreator(Apps));
//     }
// }
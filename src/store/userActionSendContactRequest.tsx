import { Dispatch } from 'react-redux';
import { SEND_CONTACT_REQUEST } from './actionsTypes';
import request from 'axios';

const SendContactRequestAction = (user: {friendRequests: Array<string>}) => {
    return {
        type: SEND_CONTACT_REQUEST,
        payload: user
    };
};

export const SendContactRequest = (userEmail: string, contactEmail: string) => {
    return (dispatch: Dispatch<AppStore.user>) => {
        console.log('Dispatching');
        return request.post('/sendfriendrequest', { withCredentials: true, userEmail, contactEmail })
            .then(({ data }) => {
                console.log('Data', data);
                dispatch(SendContactRequestAction({friendRequests: data.friendRequests}));
            })
            .catch((e) => e);
    };
};
import { Dispatch } from 'react-redux';
import { SEND_CONTACT_REQUEST } from './actionsTypes';
import request from 'axios';

const SendContactRequestAction = () => {
    return {
        type: SEND_CONTACT_REQUEST
    };
};

export const SendContactRequest = (userEmail: string, contactEmail: string) => {
    return (dispatch: Dispatch<AppStore.User>) => {
        console.log('Dispatching');
        return request.post('/sendfriendrequest', { withCredentials: true, userEmail, contactEmail })
            .then(({ data }) => {
                console.log('Data', data);
                dispatch(SendContactRequestAction());
            })
            .catch((e) => e);
    };
};
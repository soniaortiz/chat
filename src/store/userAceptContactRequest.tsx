import { Dispatch } from 'react-redux';
import { ACEPT_CONTACT_REQUEST } from './actionsTypes';
import request from 'axios';

const AceptContactRequestAction = (user: { friendRequests: Array<string> }) => {
    return {
        type: ACEPT_CONTACT_REQUEST,
        payload: user
    };
};

export const AceptContactRequest = (contactEmail: string) => {
    return (dispatch: Dispatch<AppStore.User>) => {
        console.log('Acept the contact request: ', contactEmail);
        request.post('/acceptfriendrequest', { withCredentials: true, contactEmail })
            .then(({ data }) => {
                console.log(data);
                dispatch(AceptContactRequestAction({ friendRequests: data.friendRequests }));
            })
            .catch((e: Error) => e);
    };
};
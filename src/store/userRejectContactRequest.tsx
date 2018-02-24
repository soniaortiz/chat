import { Dispatch } from 'react-redux';
import request from 'axios';
import { REJECT_CONTACT_REQUEST } from './actionsTypes';

// Action creator

const RejectContactRequestAction = (user: { friendRequests: Array<string> }) => {
    return {
        type: REJECT_CONTACT_REQUEST,
        payload: user
    };
};

// Thunk 

export const RejectContactRequest = (contactEmail: string) => {
    return (dispatch: Dispatch<AppStore.user>) => {
        console.log('Rejecting request');
        request.post('/rejectContactRequest', { withCredentials: true, contactEmail })
            .then(
                ({ data }) => {
                    console.log(data);
                    dispatch(RejectContactRequestAction({ friendRequests: data.friendRequests }));
                }
            )
            .catch((e) => e);
    }
}
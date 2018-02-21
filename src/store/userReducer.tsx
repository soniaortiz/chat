import { handleActions } from 'redux-actions';
import { REQUEST_USER_INFO, SEND_CONTACT_REQUEST } from './actionsTypes';

const userData: AppStore.user = { // init state
    name: '',
    middleName: '',
    lastName: '',
    email: '',
    birthdate: new Date(),
    gender: '',
    avatar: '',
    friendRequests: []
};

type payload = AppStore.user;

export const Reducer = handleActions < AppStore.user, payload > (
    {
        [REQUEST_USER_INFO]: (state, action) => {
            return (action.payload) ?
                { ...action.payload } : { ...state };
        },

        [SEND_CONTACT_REQUEST]: (state, action) => {
            // console.log('in send contact reducer', state, action);
            return (action.payload) ?
                {
                    ...state,
                    friendRequests: action.payload.friendRequests
                } :
                { ...state };
        }
    },
    userData
);

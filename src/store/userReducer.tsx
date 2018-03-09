import { handleActions } from 'redux-actions';
import {
    REQUEST_USER_INFO, SEND_CONTACT_REQUEST,
    ACEPT_CONTACT_REQUEST, REJECT_CONTACT_REQUEST,
    LOG_OUT,
    UPDATE_CONTACT_REQUESTS,
    CLEAR_STATE
} from './actionsTypes';

export const userData: AppStore.User = { // init state
    name: '',
    middleName: '',
    lastName: '',
    email: '',
    birthdate: new Date(),
    gender: '',
    avatar: '',
    friendRequests: [],
    contactList: [],
    conversations: []
};

type payload = AppStore.User;

export const Reducer = handleActions<AppStore.User, payload>(
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
        },
        [ACEPT_CONTACT_REQUEST]: (state, action) => {
            return (action.payload) ?
                {
                    ...state,
                    friendRequests: action.payload.friendRequests
                } :
                { ...state };
        },
        [REJECT_CONTACT_REQUEST]: (state, action) => {
            return (action.payload) ? {
                ...state,
                friendRequests: action.payload.friendRequests
            } : { ...state };
        },
        [LOG_OUT]: (state) => { // why to always pass a state
            return state;
        },
        [UPDATE_CONTACT_REQUESTS]: (state, action) => {
            return (action.payload) ? {
                ...state,
                friendRequests: action.payload.friendRequests
            } : { ...state };

        },
        [CLEAR_STATE]: (state) => {
            return { ...userData }; // Delete all the state
        }

    },
    userData
);

import { handleActions } from 'redux-actions';
import { REQUEST_LOGIN, LOG_OUT } from './actionsTypes';
// import { Action } from 'redux';
// import App from '../App';

const appState: AppStore.app = { // initial state
    logged: false,
    loading: false,
    newContactRequests: []
};

export const Reducer = handleActions(
    {
        [REQUEST_LOGIN]: (state: AppStore.app) => {
            return { ...state, logged: true, loading: true };
        },
        [LOG_OUT]: (state: AppStore.app) => {
            return { ...state, logged: false };
        },
        // [UPDATE_CONTACT_REQUESTS]: (state: AppStore.app, action) => {
        //     return (action.payload) ? { ...state, newContactRequests: action.payload } : { ...state };
        // },
        // [REQUEST_USER_INFO]: (state, action: any) => {
        //     return (action.payload) ? 
        //     { ...state, newContactRequests: action.payload.friendRequests } : { ...state };        
        // }

    },
    appState);
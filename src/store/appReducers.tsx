import { handleActions } from 'redux-actions';
import {
    REQUEST_LOGIN, LOG_OUT,
    SET_REQUEST_MODAL_WINDOW,
    SET_CONVERSATION_MODAL_WINDOW,
} from './actionsTypes';
// import { Action } from 'redux';
// import App from '../App';

const appState: AppStore.App = { // initial state
    logged: false,
    loading: false,
    requestWindowOpened: false,
    newContactRequests: [],
    conversationSelected: false
};

export const Reducer = handleActions(
    {
        [REQUEST_LOGIN]: (state: AppStore.App) => {
            return { ...state, logged: true, loading: true };
        },
        [LOG_OUT]: (state: AppStore.App) => {
            return { ...state, logged: false };
        },
        [SET_REQUEST_MODAL_WINDOW]: (state: AppStore.App) => {
            return { ...state, requestWindowOpened: !state.requestWindowOpened };
        },
        [SET_CONVERSATION_MODAL_WINDOW]: (state: AppStore.App) => {
            return { ...state, conversationSelected: !state.conversationSelected };
        }
    },
    appState);
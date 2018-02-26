import { handleActions } from 'redux-actions';
import { REQUEST_LOGIN, LOG_OUT } from './actionsTypes';

const appState: AppStore.app = { // initial state
    logged: false,
    loading: false
};

export const Reducer = handleActions(
    {
        [REQUEST_LOGIN]: (state: AppStore.app) => {
            return { ...state, logged: true, loading: true };
        },
        [LOG_OUT]: (state: AppStore.app) => {
            return { ...state, logged: false };
        },
    },
    appState);
import { handleActions } from 'redux-actions';
import { REQUEST_LOGIN } from './actionsTypes';

const appState: AppStore.app = { // initial state
    logged: false,
    loading: true
};
export const Reducer = handleActions(
    {
        [REQUEST_LOGIN]: (state: AppStore.app) => {
            return { ...state, logged: true };
        }
    }, 
    appState);


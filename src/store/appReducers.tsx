import { handleActions } from 'redux-actions';
import { REQUEST_LOGIN } from './actionsTypes';

interface appState {
    logged: boolean
}
const appState: appState = { // initial state
    logged: false
};
export const Reducer = handleActions(
    {
        [REQUEST_LOGIN]: (state: appState, action) => {
            // console.log('state changed from : ', state, action.payload);
            return { ...state, logged: true, user_id: action.payload };
        }
    }, 
    appState);
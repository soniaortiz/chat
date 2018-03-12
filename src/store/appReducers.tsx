import { handleActions } from 'redux-actions';
import {
    REQUEST_LOGIN, LOG_OUT,
    SET_REQUEST_MODAL_WINDOW,
    SET_CONVERSATION_MODAL_WINDOW,
    CLEAR_STATE
} from './actionsTypes';

export const appState: AppStore.App = { // initial state
    logged: false,
    loading: false,
    requestWindowOpened: false,
    newContactRequests: [],
    conversationSelected: false,
    currentConversation: ''
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
        [SET_CONVERSATION_MODAL_WINDOW]: (state: AppStore.App, action) => {
            console.log('payload in modal window selected', action.payload);
            return action.payload ? {
                ...state,
                conversationSelected: true,
                currentConversation: action.payload
            } :
                {
                    ...state,
                    conversationSelected: !state.conversationSelected
                };
        },
        [CLEAR_STATE]: (state: AppStore.App) => {
            return { ...appState }; // Delete all the state
        }
    },
    appState);
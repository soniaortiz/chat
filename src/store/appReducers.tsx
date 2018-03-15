import { handleActions } from 'redux-actions';
import {
    REQUEST_LOGIN, LOG_OUT,
    SET_REQUEST_MODAL_WINDOW,
    SET_CONVERSATION_MODAL_WINDOW,
    CLEAR_STATE,
    OPEN_CHAT_GROUP_MW,
    // SET_LANGUAGE
} from './actionsTypes';

export const appState: AppStore.App = { // initial state
    logged: false,
    loading: false,
    requestWindowOpened: false,
    newContactRequests: [],
    conversationSelected: false,
    currentConversation: '',
    locale: window.navigator.language,
    conversationGroupModWin: false
};
type payload = string; // change to string

export const Reducer = handleActions<AppStore.App, payload>(
    {
        [REQUEST_LOGIN]: (state: AppStore.App) => {
            return { ...state, logged: true, loading: true };
        },
        [LOG_OUT]: (state: AppStore.App) => {
            return { ...state, logged: false };
        },
        [SET_REQUEST_MODAL_WINDOW]: (state: AppStore.App) => {
            console.log('console', state.requestWindowOpened);
            return { ...state, requestWindowOpened: !state.requestWindowOpened };
        },
        [SET_CONVERSATION_MODAL_WINDOW]: (state: AppStore.App, action) => {
            console.log('state.conversationSelected');
            return action.payload ? {
                ...state,
                conversationSelected: true,
                currentConversation: action.payload
            } :
                {
                    ...state,
                    currentConversation: '',
                    conversationSelected: false
                };
        },
        [CLEAR_STATE]: (state: AppStore.App) => {
            return { ...appState }; // Delete all the state
        },
        // [SET_CONVERSATION_MODAL_WINDOW]: (state: AppStore.App) => {
        //     // console.log(state.conversationGroupModWin);
        //     return { ...state };
        // },
        [OPEN_CHAT_GROUP_MW]: (state: AppStore.App) => { // or close
            console.log('from : ', state.conversationGroupModWin, ' to: ', !state.conversationGroupModWin);
            return { ...state, conversationGroupModWin: !state.conversationGroupModWin };
        }
    },
    appState);
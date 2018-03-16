import { handleActions } from 'redux-actions';
import {
    REQUEST_LOGIN, LOG_OUT,
    SET_REQUEST_MODAL_WINDOW,
    SET_CONVERSATION_MODAL_WINDOW,
    CLEAR_STATE,
    OPEN_CHAT_GROUP_MW,
    SET_USER_CONVERSATION_GROUP
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
    conversationGroupModWin: false,
    participants: []
};
type actions = {
    conversations: string 
    participant: { name: string, email: string }
}; 

export const Reducer = handleActions<AppStore.App, actions>(
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
            console.log('state.conversationSelected', action.payload!.conversations);
            return action.payload!.conversations ? {
                ...state,
                conversationSelected: true,
                currentConversation: action.payload!.conversations
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
        [OPEN_CHAT_GROUP_MW]: (state: AppStore.App) => { // or close
            console.log('from : ', state.conversationGroupModWin, ' to: ', !state.conversationGroupModWin);
            return { ...state, conversationGroupModWin: !state.conversationGroupModWin };
        },
        [SET_USER_CONVERSATION_GROUP]: (state: AppStore.App, action) => {
            return {
                ...state,
                participants: [...state.participants, action.payload!.participant]
            };
        }
    },
    appState);
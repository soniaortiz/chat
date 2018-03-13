import { userData } from './userReducer';
import { conversationsData } from './conversationsReducer';
import { appState } from './appReducers';
import { CLEAR_STATE } from './actionsTypes';
import { handleActions } from 'redux-actions';

const clearAllStates: AppStore.Store = {
    app: appState,
    user: userData,
    conversations: conversationsData,
    intlReducer: {locale: '', messages: {}}
};

export const Reducer = handleActions(
    {
        [CLEAR_STATE]: (state: AppStore.Store) => {
            return { ...clearAllStates };
        }
    },
    clearAllStates);
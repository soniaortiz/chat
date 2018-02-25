import { handleActions } from 'redux-actions';
import { REQUEST_USER_CONVERSATIONS_LIST } from './actionsTypes';

const conversationsData: AppStore.conversations = [];

interface Actions extends AppStore.conversations { }

export const Reducer = handleActions<AppStore.conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            return (action.payload) ? { ...action.payload } : { ...state };
        }
    }, 
    conversationsData
);
import { handleActions } from 'redux-actions';
import { REQUEST_USER_CONVERSATIONS_LIST } from './actionsTypes';

const conversationsData: AppStore.Conversations = [];

interface Actions extends AppStore.Conversations { }

export const Reducer = handleActions<AppStore.Conversations, Actions>(
    {
        [REQUEST_USER_CONVERSATIONS_LIST]: (state, action) => {
            return (action.payload) ? action.payload : { ...state };
        },
    }, 
    conversationsData
);
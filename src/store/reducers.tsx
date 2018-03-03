import { combineReducers } from 'redux';
import { Reducer as app } from './appReducers';
import { Reducer as user } from './userReducer';
import { Reducer as conversations } from './conversationsReducer';
// import { Reducer as contacts } from './contactReducer';

export const store = combineReducers<AppStore.Store>(
    {
        app,
        user,
        conversations
    }
);
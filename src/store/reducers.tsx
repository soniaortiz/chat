import { combineReducers } from 'redux';
import { Reducer as app } from './appReducers';
import { Reducer as user } from './userReducer';
import { Reducer as conversations } from './conversationsReducer';
import { intlReducer } from 'react-intl-redux';

export const store = combineReducers<AppStore.Store>(
    {
        app,
        user,
        conversations,
        intlReducer
    }
);
import { combineReducers } from 'redux';
import { Reducer as app } from './appReducers';
import { Reducer as user } from './userReducer';

export const store = combineReducers(
    {
        app, user
    }
);
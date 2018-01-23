import { combineReducers } from 'redux';
import { Reducer as app } from './appReducers';

export const store = combineReducers({ app });
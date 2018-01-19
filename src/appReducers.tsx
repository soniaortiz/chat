// import {RequestLogin} from './appActions';
import {handleActions} from 'redux-actions';
import {REQUEST_LOGIN} from './actionsTypes';

interface appState{
    logged: boolean,
    email: string
}
const appState : appState={//initial state
    logged: false,
    email: ''
}

export const Reducer = handleActions({
    [REQUEST_LOGIN]: (state: appState, action)=>{
        console.log('state changed from  : ', state)
        // return {...state, logged:true, email: action.payload.email};         //test action.payload.email not null
        return {...state, logged:true}
    }
}, appState)
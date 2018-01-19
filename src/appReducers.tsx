// import {RequestLogin} from './appActions';
import {handleActions} from 'redux-actions';
import {REQUEST_LOGIN} from './actionsTypes';

interface appState{
    logged: boolean
}
const appState : appState={
    logged: false
}

export const Reducer = handleActions({
    [REQUEST_LOGIN]: (state: appState, action)=>{
        console.log('state changed from  : ', state)
        return {...state, logged:true};        
    }
}, appState)
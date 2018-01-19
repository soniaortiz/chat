//create action
import {REQUEST_LOGIN} from './actionsTypes';

export const RequestLogin = (payload: any)=>{
    return{
        type: REQUEST_LOGIN,
        payload
    }
}




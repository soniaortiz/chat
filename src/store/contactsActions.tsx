import {REQUEST_USER_CONTACT_LIST} from './actionsTypes';
import { Dispatch } from 'react-redux';
import * as axios from 'axios';
const request = axios.default;

const RequestContactlist = (payload: AppStore.contacts) =>{
    return{
        type: REQUEST_USER_CONTACT_LIST,
        payload
    }
}

export const RequestContacts = () => {
    return (dispatch: Dispatch<AppStore.contacts>) =>{
        return request.post('/friendlist', {withCredentials: true})
                .then(({data})=>{
                   console.log("contacts: ", data);
                    dispatch(RequestContactlist(
                        data.map((user: any)=>({
                            contact_id: data._id,
                            contactName: data.name
                        }))                        
                    ))
                    return true;
                })
                .catch(()=>false);
    }
}
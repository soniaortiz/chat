// create action
// import { REQUEST_LOGIN } from './actionsTypes';
import { Dispatch } from 'react-redux';
import * as axios from 'axios';
const request = axios.default;

export const RequestLogin = (email: string, password: string) => {
    return (dispatch: Dispatch<AppStore>)=>{
              return request.post(
                '/login',
                { email, password}, 
                { withCredentials: true })
                .then((response) => {
                    return response.status===200;
                })
                .catch(() => false); 

    }
};

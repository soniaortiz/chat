// create action
import { REQUEST_LOGIN } from './actionsTypes';
import { Dispatch } from 'react-redux';
import * as axios from 'axios';
// import { nspUser } from '../socketsClient';
const request = axios.default;

const requestLoginActionCreator = () => {
    return {
        type: REQUEST_LOGIN
    };
};

export const RequestLogin = (email: string, password: string) => {
    return (dispatch: Dispatch<AppStore.Store>) => {
        return request.post(
            '/login',
            { email, password },
            { withCredentials: true })
            .then((response) => {
                console.log('email: ', email);
                dispatch(requestLoginActionCreator());
                return response.status === 200;
            })
            .catch(() => false);
    };
};

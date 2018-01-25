// create action
import { REQUEST_LOGIN } from './actionsTypes';
import { Dispatch } from 'react-redux';
import * as axios from 'axios';
const request = axios.default;

const requestLoginActionCreator = () => {
    return {
        type: REQUEST_LOGIN
    }
}

export const RequestLogin = (email: string, password: string) => {
    return (dispatch: Dispatch<AppStore.store>) => {
        return request.post(
            '/login',
            { email, password },
            { withCredentials: true })
            .then((response) => {
                dispatch(requestLoginActionCreator());
                return response.status === 200;
            })
            .catch(() => false);
    };
};

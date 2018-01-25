import { Dispatch} from 'react-redux';
import {REQUEST_USER_INFO} from './actionsTypes'
import * as axios from 'axios';
const request = axios.default;

const RequestUserInfoAction = (payload: Partial<AppStore.user>) => {
    return {
        type: REQUEST_USER_INFO,
        payload
    }
}

export const RequestUserInfo = () => {
    return (dispatch: Dispatch<AppStore.user>) => {
        console.log("Request user info");
        return request.post('/profile', { withCredentials: true })
            .then(({data}) => {
                console.log('response: ', data);
                dispatch(RequestUserInfoAction({name: data.name}));
                return true;
            })
            .catch(() => false);
    };
};
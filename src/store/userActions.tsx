import { Dispatch } from 'react-redux';
import { REQUEST_USER_INFO } from './actionsTypes';
import * as axios from 'axios';
// import {nspUser} from '../socketsClient';

const request = axios.default;

export const RequestUserInfoAction = (payload: AppStore.user) => {
    return {
        type: REQUEST_USER_INFO,
        payload
    };
};

export const RequestUserInfo = () => {
    return (dispatch: Dispatch<AppStore.user>) => {
        // console.log("Request user info");
        return request.post('/profile', { withCredentials: true })
            .then(({ data }) => {
                // console.log('response: ', data);
                // dispatch(RequestUserInfoAction(
                //     {
                //         name: data.name,
                //         middleName: data.middleName,
                //         lastName: data.lastName,
                //         email: data.email,
                //         birthdate: data.birthdate,
                //         gender: data.gender,
                //         avatar: data.avatar,
                //         friendRequests: data.friendRequests,
                //         contactList: data.contacts,
                //         conversations: data.conversations
                //     }
                // ));
                return true;
            })
            .catch(() => false);
    };
};
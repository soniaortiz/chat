import { Dispatch } from 'react-redux';
import request from 'axios';
import { LOG_OUT } from './actionsTypes';
import * as H from 'history';

// Action creator

const LogOut = () => {
    return {
        type: LOG_OUT
    };
};

// tslint:disable-next-line:no-any
export function LogOutRequest (history: H.History) {
    return function (dispatch: Dispatch<AppStore.user>) {
        return request.post('/logout', { withCredentials: true })
            .then(() => {
                console.log('Loging out');
                dispatch(LogOut());
            })
            .then(() => {
                history.replace('');
            })
            .catch((e) => console.log(e));
    };
};
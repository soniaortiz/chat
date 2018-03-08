import { Dispatch } from 'react-redux';
import request from 'axios';
import { 
    // LOG_OUT,
    CLEAR_STATE 
} from './actionsTypes';
import * as H from 'history';

// Action creator

const LogOut = () => {
    return {
        type: CLEAR_STATE
    };
};

// tslint:disable-next-line:no-any
export function LogOutRequest (history: H.History) {
    return function (dispatch: Dispatch<AppStore.User>) {
        return request.post('/logout', { withCredentials: true })
            .then(() => {
                console.log('Loging out');
                dispatch(LogOut());
                // dispatch
            })
            .then(() => {
                history.replace('');
            })
            .catch((e) => console.log(e));
    };
}
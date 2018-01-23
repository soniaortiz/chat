// create action
import { REQUEST_LOGIN } from './actionsTypes';

export const RequestLogin = (payload: string) => {
    return {
        type: REQUEST_LOGIN,
        payload
    };
};

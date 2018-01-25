import { handleActions } from 'redux-actions';
import {REQUEST_USER_INFO} from './actionsTypes';

const userData: AppStore.user={ // init state
             name: ''
}

interface actions {
    name: string
}
export const Reducer = handleActions<AppStore.user, actions>(
    {
        [REQUEST_USER_INFO]: (state, action) => {
            return (action.payload && action.payload.name)?
            {...state, name: action.payload.name}: {...state};
        }
    },
    userData
);

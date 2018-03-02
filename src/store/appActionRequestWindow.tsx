import { SET_REQUEST_MODAL_WINDOW } from './actionsTypes';
import { Dispatch } from 'redux';

const setModalWindowActionCreator = () => {
    return {
        type: SET_REQUEST_MODAL_WINDOW
    };
};

export const setModalWindowAction = () => {
    return (dispatch: Dispatch<AppStore.store>) => {
        dispatch(setModalWindowActionCreator());
    };
};
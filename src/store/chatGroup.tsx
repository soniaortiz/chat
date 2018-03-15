import { OPEN_CHAT_GROUP_MW } from './actionsTypes';
import { Dispatch } from 'react-redux';

const openModalWindow = () => {
    return {
        type: OPEN_CHAT_GROUP_MW
    };
};

export const OpenModalWindowAction = () => {
    console.log('Will Open/Close the window');
    return (dispatch: Dispatch<AppStore.App>) => {
        dispatch(openModalWindow());
    };
};
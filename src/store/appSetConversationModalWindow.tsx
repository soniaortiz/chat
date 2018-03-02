import { Dispatch } from 'react-redux';
import { SET_CONVERSATION_MODAL_WINDOW } from './actionsTypes';

const SetConversationModalWindowActionCreator = () => {
    return {
        type: SET_CONVERSATION_MODAL_WINDOW
    };
};

export const SetConversationWindow = () => {
    return (dispatch: Dispatch<AppStore.App>) => {
        dispatch(SetConversationModalWindowActionCreator());
    };
};
import { Dispatch } from 'react-redux';
import { SET_CONVERSATION_MODAL_WINDOW } from './actionsTypes';
const UpdateConversationStatusActionCreator = () => {
    return {
        type: SET_CONVERSATION_MODAL_WINDOW
    };
};

export const UpdateConversationStatus = () => {
    return (dispatch: Dispatch<AppStore.App>) => {
        dispatch(UpdateConversationStatusActionCreator());
    };
};
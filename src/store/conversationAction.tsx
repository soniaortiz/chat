import { Dispatch } from 'react-redux';
import { SET_CONVERSATION_MODAL_WINDOW } from './actionsTypes';
const UpdateConversationStatusActionCreator = (payload: any) => {
    return {
        type: SET_CONVERSATION_MODAL_WINDOW,
        payload: {
            conversations: payload
        }
    };
};

export const UpdateConversationStatus = () => {
    return (dispatch: Dispatch<AppStore.App>) => {
        dispatch(UpdateConversationStatusActionCreator(''));
    };
};
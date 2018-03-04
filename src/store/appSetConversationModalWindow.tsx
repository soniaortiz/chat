import { Dispatch } from 'react-redux';
import { SET_CONVERSATION_MODAL_WINDOW } from './actionsTypes';

const SetConversationModalWindowActionCreator = (payload: string) => {
    return {
        type: SET_CONVERSATION_MODAL_WINDOW,
        payload
    };
};

export const SetConversationWindow = (conversation: string) => {
    console.log('conversation: ', conversation);
    return (dispatch: Dispatch<AppStore.App>) => {
        dispatch(SetConversationModalWindowActionCreator(conversation));
    };
};
// import { Dispatch } from 'react-redux';
import { PUSH_MESSAGE_TO_CONVERSATION } from './actionsTypes';

export const PushMessageToConversation = (payload: any) => ({ // payload will be the message
    // export const PushMessageToConversation = (payload: AppStore.Conversations) => ({ // payload will be the message

    type: PUSH_MESSAGE_TO_CONVERSATION,
    payload
});

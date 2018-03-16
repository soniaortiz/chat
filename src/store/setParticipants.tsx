import { SET_USER_CONVERSATION_GROUP } from './actionsTypes';

export const setParticipants = (payload: { name: string, email: string }) => {
    return{
        type: SET_USER_CONVERSATION_GROUP,
        payload: {
            participant: payload
        }
    };
};
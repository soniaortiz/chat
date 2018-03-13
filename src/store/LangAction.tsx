// import { SET_LANGUAGE } from './actionsTypes';
import { Dispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';

// const SetLanguageAction = (payload: any) => ({
//     type: SET_LANGUAGE,
//     payload
// });

const messages = require('../locales.json');

export const  setLanguage = (language: string) => {
    console.log('dispatch change of language', messages[language]); 
    console.log('messages', messages[language]);
    return (dispatch:  Dispatch<AppStore.App>) => {
        return dispatch(updateIntl({
            locale: language,
            messages: messages[language]
        }));
    };
};

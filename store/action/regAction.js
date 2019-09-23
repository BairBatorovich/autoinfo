import { FIRST_NAME_ADD, LAST_NAME_ADD, SURNAME_ADD, PHONE_ADD } from '../constants';

export const First_Name_Add = (first_name) => {
    console.log('тест');
    
    return {
        type: FIRST_NAME_ADD,
        first_name
    } 
};

import { FIRST_NAME_ADD, LAST_NAME_ADD, SURNAME_ADD, PHONE_ADD } from '../constants';

const defaultState = {
    last_name: 'Пинхаев',
    first_name: 'ghjdthrf',
    surname: 'Баторович',
    phone: '89021652999',
};

const regReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FIRST_NAME_ADD:
            return {
                ...state,
                first_name: action.first_name
            }

        case LAST_NAME_ADD:
            return {
                ...state,
                last_name: action.last_name
            }

        case SURNAME_ADD:
            return {
                ...state,
                surname: action.surname
            }
     

        case PHONE_ADD:
            return {
                ...state,
                phone: action.phone
            }

        default: {
            return state
        }
    }
};

export default regReducer;
import { TOKEN_ADD, PROFILE_ADD } from '../constants';

const defaultState = {

    token: '',
};

const logReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOKEN_ADD:
            return {
                ...state,
                token: action.token
            }

        default: {
            return state
        }
    }
};

export default logReducer;
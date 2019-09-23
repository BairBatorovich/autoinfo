import { TOKEN_ADD } from '../constants';

export const tokenAdd = (token) => {  
    return {
        type: TOKEN_ADD,
        token
    } 
};

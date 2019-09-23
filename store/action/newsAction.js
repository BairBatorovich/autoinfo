import { NEWS_ADD, NEWS_ID } from '../constants';

export const NewsAdd = (news) => {  
    return {
        type: NEWS_ADD,
        news
    } 
};
export const NewsIdAdd = (newsId) => {  
    return {
        type: NEWS_ID,
        newsId
    } 
};
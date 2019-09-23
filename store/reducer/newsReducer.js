import { NEWS_ADD, NEWS_ID } from '../constants';

const defaultState = {
    news: [],
    newsId: ''
};

const newsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NEWS_ADD:
            return {
                ...state,
                news: action.news
            }
        case NEWS_ID:
            return {
                ...state,
                newsId: action.newsId
            }

        default: {
            return state
        }
    }
};

export default newsReducer;
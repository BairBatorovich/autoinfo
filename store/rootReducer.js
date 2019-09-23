import { combineReducers } from 'redux';

import regReducer from './reducer/regReducer';
import logReducer from './reducer/logReducer';
import newsReducer from './reducer/newsReducer';
import profileReducer from './reducer/profileReducer';

export default combineReducers ({
   regReducer,
   logReducer,
   newsReducer,
   profileReducer,
})
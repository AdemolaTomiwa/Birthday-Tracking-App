import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import birthdayReducer from './birthdayReducer';

export default combineReducers({
   user: userReducer,
   error: errorReducer,
   birthday: birthdayReducer,
});

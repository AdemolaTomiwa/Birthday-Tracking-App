import {
   LOGOUT,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

const initialState = {
   user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
   isAuthenticated: localStorage.getItem('user') ? true : null,
   userLoading: false,
};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
         return {
            ...state,
            userLoading: true,
         };
      case USER_LOGIN_SUCCESS:
      case USER_REGISTER_SUCCESS:
         return {
            ...state,
            userLoading: false,
            user: action.payload,
            isAuthenticated: true,
         };
      case USER_LOGIN_FAIL:
      case USER_REGISTER_FAIL:
      case LOGOUT:
         localStorage.removeItem('user');
         return {
            ...state,
            userLoading: false,
            user: null,
            isAuthenticated: null,
         };
      default:
         return state;
   }
}
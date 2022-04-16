import {
   LOGOUT,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
   USER_UPDATE_PROFILE_REQUEST,
   USER_UPDATE_PROFILE_RESET,
   USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

const initialState = {
   user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
   isAuthenticated: localStorage.getItem('user') ? true : null,
   token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
   userLoading: false,
   success: null,
};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
      case USER_REGISTER_REQUEST:
      case USER_UPDATE_PROFILE_REQUEST:
         return {
            ...state,
            userLoading: true,
         };
      case USER_LOGIN_SUCCESS:
      case USER_REGISTER_SUCCESS:
         return {
            ...state,
            userLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
         };
      case USER_UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
            userLoading: false,
            success: true,
         };
      case USER_UPDATE_PROFILE_RESET:
         return {
            ...state,
         };
      case USER_LOGIN_FAIL:
      case USER_REGISTER_FAIL:
      case USER_UPDATE_PROFILE_FAIL:
      case LOGOUT:
         localStorage.removeItem('user');
         localStorage.removeItem('token');
         return {
            ...state,
            userLoading: false,
            user: null,
            token: null,
            isAuthenticated: null,
            success: null,
         };
      default:
         return state;
   }
}

import axios from 'axios';
import {
   LOGOUT,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

import { returnErrors } from './errorActions';

export const loginUser = (user) => (dispatch) => {
   dispatch({
      type: USER_LOGIN_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/auth', user, config)
      .then((res) => {
         dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data.user,
         });
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: USER_LOGIN_FAIL,
         });
      });
};

export const registerUser = (user) => (dispatch) => {
   dispatch({
      type: USER_REGISTER_REQUEST,
   });

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   axios
      .post('/api/users', user, config)
      .then((res) => {
         dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data.user,
         });
         localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: USER_REGISTER_FAIL,
         });
      });
};

export const logoutUser = () => (dispatch) => {
   dispatch({ type: LOGOUT });

   localStorage.removeItem('user');
};

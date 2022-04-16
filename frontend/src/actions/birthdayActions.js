import axios from 'axios';
import {
   BIRTHDAY_DETAILS_FAIL,
   BIRTHDAY_DETAILS_REQUEST,
   BIRTHDAY_DETAILS_SUCCESS,
   BIRTHDAY_LIST_FAIL,
   BIRTHDAY_LIST_REQUEST,
   BIRTHDAY_LIST_SUCCESS,
   CREATE_BIRTHDAY_FAIL,
   CREATE_BIRTHDAY_REQUEST,
   CREATE_BIRTHDAY_SUCCESS,
   LATEST_BIRTHDAY_FAIL,
   LATEST_BIRTHDAY_REQUEST,
   LATEST_BIRTHDAY_SUCCESS,
} from '../constants/birthdayConstants';

import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getBirthdays = () => (dispatch, getState) => {
   dispatch({ type: BIRTHDAY_LIST_REQUEST });

   axios
      .get('/api/birthday', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: BIRTHDAY_LIST_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: BIRTHDAY_LIST_FAIL,
         });
      });
};

export const getBirthday = (id) => (dispatch, getState) => {
   dispatch({ type: BIRTHDAY_DETAILS_REQUEST });

   axios
      .get(`/api/birthday/${id}`, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: BIRTHDAY_DETAILS_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: BIRTHDAY_DETAILS_FAIL,
         });
      });
};

export const createBirthday = (birthday) => (dispatch, getState) => {
   dispatch({ type: CREATE_BIRTHDAY_REQUEST });

   axios
      .post('/api/birthday', birthday, tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: CREATE_BIRTHDAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: CREATE_BIRTHDAY_FAIL,
         });
      });
};

export const getLatestBirthday = () => (dispatch, getState) => {
   dispatch({ type: LATEST_BIRTHDAY_REQUEST });

   axios
      .get('/api/birthday/latest/birthday', tokenConfig(getState))
      .then((res) => {
         dispatch({
            type: LATEST_BIRTHDAY_SUCCESS,
            payload: res.data,
         });
      })
      .catch((err) => {
         dispatch(returnErrors(err.response.data.msg));
         dispatch({
            type: LATEST_BIRTHDAY_FAIL,
         });
      });
};

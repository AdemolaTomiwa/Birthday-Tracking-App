import axios from 'axios';
import {
   BIRTHDAY_LIST_FAIL,
   BIRTHDAY_LIST_REQUEST,
   BIRTHDAY_LIST_SUCCESS,
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

import {
   BIRTHDAY_LIST_FAIL,
   BIRTHDAY_LIST_REQUEST,
   BIRTHDAY_LIST_SUCCESS,
   CREATE_BIRTHDAY_REQUEST,
   CREATE_BIRTHDAY_SUCCESS,
   CREATE_BIRTHDAY_FAIL,
} from '../constants/birthdayConstants';

const initialState = {
   birthdays: [],
   birthdayLoading: false,
   success: null,
};

export default function birthdayReducer(state = initialState, action) {
   switch (action.type) {
      case BIRTHDAY_LIST_REQUEST:
      case CREATE_BIRTHDAY_REQUEST:
         return {
            ...state,
            birthdayLoading: true,
            success: false,
         };
      case BIRTHDAY_LIST_SUCCESS:
         return {
            ...state,
            birthdays: action.payload,
            birthdayLoading: false,
         };
      case CREATE_BIRTHDAY_SUCCESS:
         return {
            ...state,
            success: true,
            birthdayLoading: false,
         };
      case BIRTHDAY_LIST_FAIL:
      case CREATE_BIRTHDAY_FAIL:
         return {
            ...state,
            birthdays: [],
            birthdayLoading: false,
            success: false,
         };
      default:
         return state;
   }
}

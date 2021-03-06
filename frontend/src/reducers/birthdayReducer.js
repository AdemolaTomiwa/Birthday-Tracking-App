import {
   BIRTHDAY_LIST_FAIL,
   BIRTHDAY_LIST_REQUEST,
   BIRTHDAY_LIST_SUCCESS,
   CREATE_BIRTHDAY_REQUEST,
   CREATE_BIRTHDAY_SUCCESS,
   CREATE_BIRTHDAY_FAIL,
   BIRTHDAY_DETAILS_REQUEST,
   BIRTHDAY_DETAILS_SUCCESS,
   BIRTHDAY_DETAILS_FAIL,
   LATEST_BIRTHDAY_REQUEST,
   LATEST_BIRTHDAY_SUCCESS,
   LATEST_BIRTHDAY_FAIL,
   DELETE_BIRTHDAY_FAIL,
   DELETE_BIRTHDAY_REQUEST,
   DELETE_BIRTHDAY_SUCCESS,
} from '../constants/birthdayConstants';

const initialState = {
   birthdays: [],
   birthday: null,
   birthdayLoading: false,
   success: null,
   latestBirthday: [],
};

export default function birthdayReducer(state = initialState, action) {
   switch (action.type) {
      case BIRTHDAY_LIST_REQUEST:
      case CREATE_BIRTHDAY_REQUEST:
      case BIRTHDAY_DETAILS_REQUEST:
      case LATEST_BIRTHDAY_REQUEST:
      case DELETE_BIRTHDAY_REQUEST:
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
      case BIRTHDAY_DETAILS_SUCCESS:
         return {
            ...state,
            birthday: action.payload,
            birthdayLoading: false,
         };
      case CREATE_BIRTHDAY_SUCCESS:
         return {
            ...state,
            success: true,
            birthdayLoading: false,
         };
      case LATEST_BIRTHDAY_SUCCESS:
         return {
            ...state,
            birthdayLoading: false,
            latestBirthday: action.payload,
         };
      case DELETE_BIRTHDAY_SUCCESS:
         return {
            ...state,
            birthdayLoading: false,
            birthdays: state.birthdays.filter(
               (birthday) => birthday._id !== action.payload
            ),
         };
      case BIRTHDAY_LIST_FAIL:
      case CREATE_BIRTHDAY_FAIL:
      case BIRTHDAY_DETAILS_FAIL:
      case LATEST_BIRTHDAY_FAIL:
      case DELETE_BIRTHDAY_FAIL:
         return {
            ...state,
            birthdays: [],
            birthday: null,
            birthdayLoading: false,
            success: false,
            latestBirthday: [],
         };
      default:
         return state;
   }
}

import {
   BIRTHDAY_LIST_FAIL,
   BIRTHDAY_LIST_REQUEST,
   BIRTHDAY_LIST_SUCCESS,
} from '../constants/birthdayConstants';

const initialState = {
   birthdays: [],
   birthdayLoading: false,
};

export default function birthdayReducer(state = initialState, action) {
   switch (action.type) {
      case BIRTHDAY_LIST_REQUEST:
         return {
            ...state,
            birthdayLoading: true,
         };
      case BIRTHDAY_LIST_SUCCESS:
         return {
            ...state,
            birthdays: action.payload,
            birthdayLoading: false,
         };
      case BIRTHDAY_LIST_FAIL:
         return {
            ...state,
            birthdays: [],
            birthdayLoading: false,
         };
      default:
         return state;
   }
}

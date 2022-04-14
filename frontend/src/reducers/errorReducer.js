import { GET_ERRORS, CLEAR_ERRORS } from '../constants/errorConstants';

const initialState = {
   msg: null,
};

export default function errorReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ERRORS:
         return {
            msg: action.payload.msg,
         };
      case CLEAR_ERRORS:
         return {
            msg: null,
         };
      default:
         return state;
   }
}

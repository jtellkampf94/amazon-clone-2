import { UserAction } from "./../actions";
import { ActionTypes } from "../actionTypes";

interface UserState {
  isUpdated: boolean;
  loading: boolean;
  errors: string | null;
  message: string | null;
}

const initialState: UserState = {
  isUpdated: false,
  loading: false,
  errors: null,
  message: null
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.UPDATE_PASSWORD_REQUEST:
    case ActionTypes.UPDATE_PROFILE_REQUEST:
    case ActionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
        message: null
      };
    case ActionTypes.UPDATE_PASSWORD_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      };
    case ActionTypes.UPDATE_PASSWORD_RESET:
    case ActionTypes.UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false
      };
    case ActionTypes.UPDATE_PASSWORD_FAILURE:
    case ActionTypes.UPDATE_PROFILE_FAILURE:
    case ActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ActionTypes.CLEAR_USER_ERRORS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};

export default userReducer;

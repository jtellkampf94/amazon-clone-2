import { UserAction } from "./../actions";
import { ActionTypes } from "../actionTypes";
import { User } from "./authReducer";

interface UserState {
  isUpdated: boolean;
  loading: boolean;
  errors: string | null;
  message: string | null;
  success: boolean;
  users: User[] | null;
}

const initialState: UserState = {
  isUpdated: false,
  loading: false,
  errors: null,
  message: null,
  success: false,
  users: null
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.UPDATE_PASSWORD_REQUEST:
    case ActionTypes.UPDATE_PROFILE_REQUEST:
    case ActionTypes.FORGOT_PASSWORD_REQUEST:
    case ActionTypes.NEW_PASSWORD_REQUEST:
    case ActionTypes.GET_ALL_USERS_REQUEST:
    case ActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
        message: null,
        success: false
      };
    case ActionTypes.UPDATE_PASSWORD_SUCCESS:
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
    case ActionTypes.UPDATE_USER_SUCCESS:
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
    case ActionTypes.NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case ActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case ActionTypes.USER_RESET:
      return {
        ...state,
        isUpdated: false
      };
    case ActionTypes.UPDATE_PASSWORD_FAILURE:
    case ActionTypes.UPDATE_PROFILE_FAILURE:
    case ActionTypes.FORGOT_PASSWORD_FAILURE:
    case ActionTypes.NEW_PASSWORD_FAILURE:
    case ActionTypes.GET_ALL_USERS_FAILURE:
    case ActionTypes.UPDATE_USER_FAILURE:
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

import { AuthAction } from "./../actions/authActions";
import { ActionTypes } from "../actionTypes";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: {
    publicId: string;
    url: string;
  };
  role: string;
  resetPasswordToken?: String;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  errors: null
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: action.payload
      };
    case ActionTypes.CLEAR_LOGIN_ERRORS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};

export default authReducer;

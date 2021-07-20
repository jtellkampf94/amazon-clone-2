import axios from "axios";
import { Dispatch } from "redux";
import {
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  RegisterRequestAction,
  RegisterSuccessAction,
  RegisterFailureAction,
  ClearAuthErrorsAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
): Promise<LoginSuccessAction | LoginFailureAction> => {
  try {
    const loginRequestAction: LoginRequestAction = {
      type: ActionTypes.LOGIN_REQUEST
    };
    dispatch(loginRequestAction);

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const action: LoginSuccessAction = {
      type: ActionTypes.LOGIN_SUCCESS,
      payload: data.user
    };

    return dispatch(action);
  } catch (error) {
    const action: LoginFailureAction = {
      type: ActionTypes.LOGIN_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

interface UserData {
  email: string;
  password: string
}

export const register = (userData: UserData) => async (
  dispatch: Dispatch
): Promise<RegisterSuccessAction | RegisterFailureAction> => {
  try {
    const registerRequestAction: RegisterRequestAction = {
      type: ActionTypes.REGISTER_REQUEST
    };
    dispatch(registerRequestAction);

    const { data } = await axios.post(
      `/api/v1/register`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    const action: RegisterSuccessAction = {
      type: ActionTypes.REGISTER_SUCCESS,
      payload: data.user
    };

    return dispatch(action);
  } catch (error) {
    const action: RegisterFailureAction = {
      type: ActionTypes.REGISTER_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearAuthErrors = () => (
  dispatch: Dispatch
): ClearAuthErrorsAction => {
  const action: ClearAuthErrorsAction = {
    type: ActionTypes.CLEAR_AUTH_ERRORS
  };
  return dispatch(action);
};

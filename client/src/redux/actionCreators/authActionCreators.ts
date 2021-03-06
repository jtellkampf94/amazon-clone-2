import axios from "axios";
import { Dispatch } from "redux";
import {
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  RegisterRequestAction,
  RegisterSuccessAction,
  RegisterFailureAction,
  ClearAuthErrorsAction,
  LoadUserRequestAction,
  LoadUserSuccessAction,
  LoadUserFailureAction,
  LogoutSuccessAction,
  LogoutFailureAction
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

export const register = (userData: FormData) => async (
  dispatch: Dispatch
): Promise<RegisterSuccessAction | RegisterFailureAction> => {
  try {
    const registerRequestAction: RegisterRequestAction = {
      type: ActionTypes.REGISTER_REQUEST
    };
    dispatch(registerRequestAction);

    const { data } = await axios.post(`/api/v1/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
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

export const loadUser = () => async (
  dispatch: Dispatch
): Promise<LoadUserSuccessAction | LoadUserFailureAction> => {
  try {
    const LoadUserRequestAction: LoadUserRequestAction = {
      type: ActionTypes.LOAD_USER_REQUEST
    };
    dispatch(LoadUserRequestAction);

    const { data } = await axios.get(`/api/v1/profile`);
    const action: LoadUserSuccessAction = {
      type: ActionTypes.LOAD_USER_SUCCESS,
      payload: data.user
    };

    return dispatch(action);
  } catch (error) {
    const action: LoadUserFailureAction = {
      type: ActionTypes.LOAD_USER_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const logout = () => async (
  dispatch: Dispatch
): Promise<LogoutSuccessAction | LogoutFailureAction> => {
  try {
    await axios.get(`/api/v1/logout`);

    const action: LogoutSuccessAction = {
      type: ActionTypes.LOGOUT_SUCCESS
    };

    return dispatch(action);
  } catch (error) {
    const action: LogoutFailureAction = {
      type: ActionTypes.LOGOUT_FAILURE,
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

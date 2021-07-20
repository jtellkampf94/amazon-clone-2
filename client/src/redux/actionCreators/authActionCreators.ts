import axios from "axios";
import { Dispatch } from "redux";
import {
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  ClearLoginErrorsAction
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

export const clearLoginErrors = () => (
  dispatch: Dispatch
): ClearLoginErrorsAction => {
  const action: ClearLoginErrorsAction = {
    type: ActionTypes.CLEAR_LOGIN_ERRORS
  };
  return dispatch(action);
};

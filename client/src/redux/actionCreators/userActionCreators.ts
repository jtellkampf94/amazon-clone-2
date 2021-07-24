import axios from "axios";
import { Dispatch } from "redux";
import {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileResetAction,
  UpdateProfileFailureAction,
  UpdatePasswordRequestAction,
  UpdatePasswordSuccessAction,
  UpdatePasswordResetAction,
  UpdatePasswordFailureAction,
  ForgotPasswordRequestAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction,
  NewPasswordRequestAction,
  NewPasswordSuccessAction,
  NewPasswordFailureAction,
  ClearUserErrorsAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const updateProfile = (userData: FormData) => async (
  dispatch: Dispatch
): Promise<UpdateProfileSuccessAction | UpdateProfileFailureAction> => {
  try {
    const updateProfileRequestAction: UpdateProfileRequestAction = {
      type: ActionTypes.UPDATE_PROFILE_REQUEST
    };
    dispatch(updateProfileRequestAction);

    const { data } = await axios.put(`/api/v1/profile`, userData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    const action: UpdateProfileSuccessAction = {
      type: ActionTypes.UPDATE_PROFILE_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: UpdateProfileFailureAction = {
      type: ActionTypes.UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

interface Passwords {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = (passwords: Passwords) => async (
  dispatch: Dispatch
): Promise<UpdatePasswordSuccessAction | UpdatePasswordFailureAction> => {
  try {
    const updatePasswordRequestAction: UpdatePasswordRequestAction = {
      type: ActionTypes.UPDATE_PASSWORD_REQUEST
    };
    dispatch(updatePasswordRequestAction);

    const { data } = await axios.put(`/api/v1/password/update`, passwords, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const action: UpdatePasswordSuccessAction = {
      type: ActionTypes.UPDATE_PASSWORD_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: UpdatePasswordFailureAction = {
      type: ActionTypes.UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const forgotPassword = (email: string) => async (
  dispatch: Dispatch
): Promise<ForgotPasswordSuccessAction | ForgotPasswordFailureAction> => {
  try {
    const forgotPasswordRequestAction: ForgotPasswordRequestAction = {
      type: ActionTypes.FORGOT_PASSWORD_REQUEST
    };
    dispatch(forgotPasswordRequestAction);

    const { data } = await axios.post(`/api/v1/password/forgot`, email, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const action: ForgotPasswordSuccessAction = {
      type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: data.message
    };

    return dispatch(action);
  } catch (error) {
    const action: ForgotPasswordFailureAction = {
      type: ActionTypes.FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const resetPassword = (token: string, passwords: Passwords) => async (
  dispatch: Dispatch
): Promise<NewPasswordSuccessAction | NewPasswordFailureAction> => {
  try {
    const newPasswordRequestAction: NewPasswordRequestAction = {
      type: ActionTypes.NEW_PASSWORD_REQUEST
    };
    dispatch(newPasswordRequestAction);

    const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const action: NewPasswordSuccessAction = {
      type: ActionTypes.NEW_PASSWORD_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: NewPasswordFailureAction = {
      type: ActionTypes.NEW_PASSWORD_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearUserErrors = () => (
  dispatch: Dispatch
): ClearUserErrorsAction => {
  const action: ClearUserErrorsAction = {
    type: ActionTypes.CLEAR_USER_ERRORS
  };
  return dispatch(action);
};

export const updateProfileReset = () => (
  dispatch: Dispatch
): UpdateProfileResetAction => {
  const action: UpdateProfileResetAction = {
    type: ActionTypes.UPDATE_PROFILE_RESET
  };
  return dispatch(action);
};

export const updatePasswordReset = () => (
  dispatch: Dispatch
): UpdatePasswordResetAction => {
  const action: UpdatePasswordResetAction = {
    type: ActionTypes.UPDATE_PASSWORD_RESET
  };
  return dispatch(action);
};

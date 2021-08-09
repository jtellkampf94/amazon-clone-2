import axios from "axios";
import { Dispatch } from "redux";
import {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailureAction,
  UpdatePasswordRequestAction,
  UpdatePasswordSuccessAction,
  UpdatePasswordFailureAction,
  UserResetAction,
  ForgotPasswordRequestAction,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction,
  NewPasswordRequestAction,
  NewPasswordSuccessAction,
  NewPasswordFailureAction,
  GetAllUsersRequestAction,
  GetAllUsersSuccessAction,
  GetAllUsersFailureAction,
  GetUserRequestAction,
  GetUserSuccessAction,
  GetUserFailureAction,
  UpdateUserRequestAction,
  UpdateUserSuccessAction,
  UpdateUserFailureAction,
  ClearUserErrorsAction
} from "../actions";

import { ActionTypes } from "../actionTypes";
import { User } from "../reducers/authReducer";

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

    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      { email },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
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

interface NewPasswords {
  password: string;
  confirmPassword: string;
}

export const resetPassword = (token: string, passwords: NewPasswords) => async (
  dispatch: Dispatch
): Promise<NewPasswordSuccessAction | NewPasswordFailureAction> => {
  try {
    const newPasswordRequestAction: NewPasswordRequestAction = {
      type: ActionTypes.NEW_PASSWORD_REQUEST
    };
    dispatch(newPasswordRequestAction);

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
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

export const getAllUsers = () => async (
  dispatch: Dispatch
): Promise<GetAllUsersSuccessAction | GetAllUsersFailureAction> => {
  try {
    const getAllUsersRequestAction: GetAllUsersRequestAction = {
      type: ActionTypes.GET_ALL_USERS_REQUEST
    };
    dispatch(getAllUsersRequestAction);

    const { data } = await axios.get(`/api/v1/admin/users`);
    const action: GetAllUsersSuccessAction = {
      type: ActionTypes.GET_ALL_USERS_SUCCESS,
      payload: data.users
    };

    return dispatch(action);
  } catch (error) {
    const action: GetAllUsersFailureAction = {
      type: ActionTypes.GET_ALL_USERS_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const getUser = (id: string) => async (
  dispatch: Dispatch
): Promise<GetUserSuccessAction | GetUserFailureAction> => {
  try {
    const getUserRequestAction: GetUserRequestAction = {
      type: ActionTypes.GET_USER_REQUEST
    };
    dispatch(getUserRequestAction);

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    const action: GetUserSuccessAction = {
      type: ActionTypes.GET_USER_SUCCESS,
      payload: data.user
    };

    return dispatch(action);
  } catch (error) {
    const action: GetUserFailureAction = {
      type: ActionTypes.GET_USER_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const updateUser = (id: string, userData: User) => async (
  dispatch: Dispatch
): Promise<UpdateUserSuccessAction | UpdateUserFailureAction> => {
  try {
    const updateUserRequestAction: UpdateUserRequestAction = {
      type: ActionTypes.UPDATE_USER_REQUEST
    };
    dispatch(updateUserRequestAction);

    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, {
      headers: { "Content-Type": "application/json" }
    });
    const action: UpdateUserSuccessAction = {
      type: ActionTypes.UPDATE_USER_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: UpdateUserFailureAction = {
      type: ActionTypes.UPDATE_USER_FAILURE,
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

export const userReset = () => (dispatch: Dispatch): UserResetAction => {
  const action: UserResetAction = {
    type: ActionTypes.USER_RESET
  };
  return dispatch(action);
};

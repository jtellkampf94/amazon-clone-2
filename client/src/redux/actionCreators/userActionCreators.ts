import axios from "axios";
import { Dispatch } from "redux";
import {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileResetAction,
  UpdateProfileFailureAction
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

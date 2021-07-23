import { UserAction } from "./../actions";
import { ActionTypes } from "../actionTypes";

interface UserState {
  isUpdated: boolean;
  loading: boolean;
  errors: string | null;
}

const initialState: UserState = {
  isUpdated: false,
  loading: false,
  errors: null
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case ActionTypes.UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false
      };
    case ActionTypes.UPDATE_PROFILE_FAILURE:
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

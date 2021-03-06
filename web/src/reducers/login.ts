import { Action } from "@/@types/types";
import {
  REQ_POST_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "@/viewmodels/actionTypes";

export interface State {
  access_token: string;
}

export const initialState: State = {
  access_token: "",
};

export default function(state: State = initialState, action: Action) {
  switch (action.type) {
    case REQ_POST_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        access_token: "",
      };

    default:
      return state;
  }
}

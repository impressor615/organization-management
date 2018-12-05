import { Action } from "@/@types/types";
import {
  CLEAR_ERROR,
  SET_LOADING,
} from "@/viewmodels/actionTypes";

interface CommonUIAction extends Action {
  loading?: boolean;
}

export interface State {
  loading: boolean;
  error: string;
}

export const initialState: State = {
  error: "",
  loading: false,
};

export default function(state: State = initialState, action: CommonUIAction) {
  if (action.type.includes("REQ") && action.type.includes("FAILURE")) {
    return {
      ...state,
      error: action.payload.message,
    };
  }

  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}

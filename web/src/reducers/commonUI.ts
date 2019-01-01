import { Action } from "@/@types/types";
import {
  HIDE_MESSAGE,
  SET_LOADING,
  SHOW_MESSAGE,
} from "@/viewmodels/actionTypes";

interface CommonUIAction extends Action {
  loading?: boolean;
}

export enum MessageType {
  Error = "error",
  Message = "message",
}

export interface State {
  loading: boolean;
  message: {
    type: MessageType;
    message: string;
  } | null;
}

export const initialState: State = {
  loading: false,
  message: null,
};

export default function(state: State = initialState, action: CommonUIAction) {
  if (action.type.includes("REQ") && action.type.includes("FAILURE")) {
    return {
      ...state,
      message: {
        message: action.payload.message,
        type: "error",
      },
    };
  }

  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SHOW_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case HIDE_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
}

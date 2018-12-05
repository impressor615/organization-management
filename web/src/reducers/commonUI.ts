import {
  CLEAR_ERROR,
} from "@/viewmodels/actionTypes";

interface State {
  loading: boolean;
  error: string;
}

interface Action {
  type: string;
  payload: any;
}

export const initialState: State = {
  error: "",
  loading: false,
};

export default function(state: State = initialState, action: Action) {
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
    default:
      return state;
  }
}

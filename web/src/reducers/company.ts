import { Action } from "@/@types/types";
import {
  REQ_GET_COMPANY_SUCCESS,
} from "@/viewmodels/actionTypes";

export interface State {
  name: string;
  departments: object[];
}

export const initialState: State = {
  departments: [],
  name: "",
};

export default function(state: State = initialState, action: Action) {
  switch (action.type) {
    case REQ_GET_COMPANY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

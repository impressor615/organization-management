import { Action } from "@/@types/types";
import {
  REQ_GET_COMPANY_SUCCESS,
  REQ_POST_DEPT_SUCCESS,
  REQ_POST_USER_SUCCESS,
} from "@/viewmodels/actionTypes";

export interface State {
  name: string;
  departments: object[];
  users: object[];
}

export const initialState: State = {
  departments: [],
  name: "",
  users: [],
};

export default function(state: State = initialState, action: Action) {
  switch (action.type) {
    case REQ_GET_COMPANY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case REQ_POST_DEPT_SUCCESS:
      const newDepts = [...state.departments];
      newDepts.push({ ...action.meta, ...action.payload });
      return {
        ...state,
        departments: newDepts,
      };

    case REQ_POST_USER_SUCCESS:
      const newUsers = [...state.users];
      newUsers.unshift({ ...action.meta, ...action.payload });
      return {
        ...state,
        users: newUsers,
      };

    default:
      return state;
  }
}

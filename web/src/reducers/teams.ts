import { Action } from "@/@types/types";
import {
  REQ_POST_TEAM_SUCCESS,
} from "@/viewmodels/actionTypes";

export interface TeamProps {
  name: string;
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface State {
  teams: [TeamProps?];
}

export const initialState: State = {
  teams: [],
};

export default function(state: State = initialState, action: Action) {

  switch (action.type) {
    case REQ_POST_TEAM_SUCCESS:
      return {
        ...state,
        teams: [
          ...state.teams,
          {
            ...action.meta,
            ...action.payload,
          },
        ],
      };

    default:
      return state;
  }
}

import { Action } from "@/@types/types";
import {
  REQ_GET_TEAMS_SUCCESS,
  REQ_POST_TEAM_SUCCESS,
} from "@/viewmodels/actionTypes";

export interface TeamProps {
  authority: string;
  organization?: {
    name: string;
    _id: string;
  };
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
            authority: "admin",
            organization: {
              ...action.meta,
              ...action.payload,
            },
          },
        ],
      };

    case REQ_GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: [
          ...state.teams,
          ...action.payload,
        ],
      };

    default:
      return state;
  }
}

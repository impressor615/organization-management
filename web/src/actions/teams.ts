import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_GET_TEAMS,
  REQ_GET_TEAMS_FAILURE,
  REQ_GET_TEAMS_SUCCESS,
  REQ_POST_TEAM,
  REQ_POST_TEAM_FAILURE,
  REQ_POST_TEAM_SUCCESS,
} from "@/viewmodels/actionTypes";

export const createTeam = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/user/teams",
      method: "POST",
      types: [
        REQ_POST_TEAM,
        {
          meta: data,
          type: REQ_POST_TEAM_SUCCESS,
        },
        REQ_POST_TEAM_FAILURE,
      ],
    },
  })
);

export const getTeams = () => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      endpoint: "/api/user/teams",
      method: "GET",
      types: [
        REQ_GET_TEAMS,
        REQ_GET_TEAMS_SUCCESS,
        REQ_GET_TEAMS_FAILURE,
      ],
    },
  })
);

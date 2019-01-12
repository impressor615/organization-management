import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_POST_TEAM,
  REQ_POST_TEAM_FAILURE,
  REQ_POST_TEAM_SUCCESS,
} from "@/viewmodels/actionTypes";

export const createTeam = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/user/organizations",
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

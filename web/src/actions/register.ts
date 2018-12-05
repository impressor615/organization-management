import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_POST_REGISTER_USER,
  REQ_POST_REGISTER_USER_FAILURE,
  REQ_POST_REGISTER_USER_SUCCESS,
} from "@/viewmodels/actionTypes";

export const register = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/register",
      method: "POST",
      types: [
        REQ_POST_REGISTER_USER,
        REQ_POST_REGISTER_USER_SUCCESS,
        REQ_POST_REGISTER_USER_FAILURE,
      ],
    },
  })
);

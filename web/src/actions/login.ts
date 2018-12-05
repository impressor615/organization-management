import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_POST_LOGIN,
  REQ_POST_LOGIN_FAILURE,
  REQ_POST_LOGIN_SUCCESS,
} from "@/viewmodels/actionTypes";

export const login = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/login",
      method: "POST",
      types: [
        REQ_POST_LOGIN,
        REQ_POST_LOGIN_SUCCESS,
        REQ_POST_LOGIN_FAILURE,
      ],
    },
  })
);

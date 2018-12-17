import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_GET_COMPANY,
  REQ_GET_COMPANY_FAILURE,
  REQ_GET_COMPANY_SUCCESS,
  REQ_GET_USERS,
  REQ_GET_USERS_FAILURE,
  REQ_GET_USERS_SUCCESS,
  REQ_POST_DEPT,
  REQ_POST_DEPT_FAILURE,
  REQ_POST_DEPT_SUCCESS,
  REQ_POST_USER,
  REQ_POST_USER_FAILURE,
  REQ_POST_USER_SUCCESS,
} from "@/viewmodels/actionTypes";

export const getCompany = () => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      endpoint: "/api/company",
      method: "GET",
      types: [
        REQ_GET_COMPANY,
        REQ_GET_COMPANY_SUCCESS,
        REQ_GET_COMPANY_FAILURE,
      ],
    },
  })
);

export const createDept = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/company/departments",
      method: "POST",
      types: [
        REQ_POST_DEPT,
        {
          meta: data,
          type: REQ_POST_DEPT_SUCCESS,
        },
        REQ_POST_DEPT_FAILURE,
      ],
    },
  })
);

export const createUser = (data: object) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      body: data,
      endpoint: "/api/users",
      method: "POST",
      types: [
        REQ_POST_USER,
        {
          meta: data,
          type: REQ_POST_USER_SUCCESS,
        },
        REQ_POST_USER_FAILURE,
      ],
    },
  })
);

export const getUsers = (queryStrings: string) => (dispatch: Dispatch) => (
  dispatch({
    [RSAA]: {
      endpoint: `/api/users?${queryStrings}`,
      method: "GET",
      types: [
        REQ_GET_USERS,
        REQ_GET_USERS_SUCCESS,
        REQ_GET_USERS_FAILURE,
      ],
    },
  })
);

import { RSAA } from "redux-api-middleware";

import { Dispatch } from "@/@types/types";
import {
  REQ_GET_COMPANY,
  REQ_GET_COMPANY_FAILURE,
  REQ_GET_COMPANY_SUCCESS,
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

import { RSAA } from "redux-api-middleware";

import { Next } from "@/@types/types";

const apiJsonBody = () => (next: Next) => (action: any) => {
  if (!action[RSAA]) {
    return next(action);
  }

  const newAction = { ...action };
  const { access_token }: { access_token: string } = JSON.parse(localStorage.getItem("__oc-chart")) || {};
  newAction[RSAA].headers = {
    "x-access-token": access_token,
  };

  return next(newAction);
};

export default apiJsonBody;

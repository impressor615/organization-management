import { RSAA } from "redux-api-middleware";

import { Next } from "@/@types/types";

const isPlainObject = (obj: object) => obj && obj.toString && obj.toString() === "[object Object]";
const apiJsonBody = () => (next: Next) => (action: any) => {
  if (!action[RSAA]) {
    return next(action);
  }

  const newAction = { ...action };
  const { body } = newAction[RSAA];
  if (isPlainObject(body) || body instanceof Array) {
    newAction[RSAA].headers = {
      ...newAction[RSAA].headers,
      "Content-Type": "application/json",
    };
    newAction[RSAA].body = JSON.stringify(body);
  }

  return next(newAction);
};

export default apiJsonBody;

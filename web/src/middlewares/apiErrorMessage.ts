import { Next } from "@/@types/types";

const apiErrorMessage = () => (next: Next) => (action: any) => {
  if (!/FAILURE/.test(action.type)) {
    return next(action);
  }

  const { payload } = action;
  if (payload && payload.name === "ApiError" && payload.response) {
    const { response } = payload;
    payload.message = response.message || payload.message;
  }

  return next(action);
};

export default apiErrorMessage;

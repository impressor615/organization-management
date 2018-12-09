import { applyMiddleware, createStore } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import logger from "redux-logger";
import thunk from "redux-thunk";

import apiErrorMessage from "@/middlewares/apiErrorMessage";
import apiHeaders from "@/middlewares/apiHeaders";
import apiJsonBody from "@/middlewares/apiJsonBody";
import reducer from "@/reducers";

const middlewares = [thunk, apiHeaders, apiJsonBody, apiMiddleware, apiErrorMessage];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}

export default (preloadedState: object) => createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

import { combineReducers } from "redux";
import commonUI, { initialState as commonUIStates } from "./commonUI";

export const initialState: object = {
  commonUI: commonUIStates,
};

export default combineReducers({
  commonUI,
});

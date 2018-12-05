import { combineReducers } from "redux";
import commonUI, { initialState as commonUIStates, State as commonUIStateInterface } from "./commonUI";

export const initialState: object = {
  commonUI: commonUIStates,
};

export interface StateInterface {
  commonUI: commonUIStateInterface;
}

export default combineReducers({
  commonUI,
});

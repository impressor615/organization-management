import { combineReducers } from "redux";
import commonUI, { initialState as commonUIStates, State as CommonUIStateInterface } from "./commonUI";
import login, { initialState as loginStates, State as LoginStateInterface } from "./commonUI";

export const initialState: object = {
  commonUI: commonUIStates,
  login: loginStates,
};

export interface StateInterface {
  commonUI: CommonUIStateInterface;
  login: LoginStateInterface;
}

export default combineReducers({
  commonUI,
  login,
});

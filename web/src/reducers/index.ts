import { combineReducers } from "redux";
import commonUI, { initialState as commonUIStates, State as CommonUIStateInterface } from "./commonUI";
import company, { initialState as companyStates, State as CompanyStateInterface } from "./company";
import login, { initialState as loginStates, State as LoginStateInterface } from "./login";

export const initialState: object = {
  commonUI: commonUIStates,
  company: companyStates,
  login: loginStates,
};

export interface StateInterface {
  commonUI: CommonUIStateInterface;
  company: CompanyStateInterface;
  login: LoginStateInterface;
}

export default combineReducers({
  commonUI,
  company,
  login,
});

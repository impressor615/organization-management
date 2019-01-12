import { combineReducers } from "redux";
import commonUI, { initialState as commonUIStates, State as CommonUIStateInterface } from "./commonUI";
import company, { initialState as companyStates, State as CompanyStateInterface } from "./company";
import login, { initialState as loginStates, State as LoginStateInterface } from "./login";
import teams, { initialState as teamsStates, State as TeamsStateInterface } from "./teams";

export const initialState: object = {
  commonUI: commonUIStates,
  company: companyStates,
  login: loginStates,
  team: teamsStates,
};

export interface StateInterface {
  commonUI: CommonUIStateInterface;
  company: CompanyStateInterface;
  login: LoginStateInterface;
  teams: TeamsStateInterface;
}

export default combineReducers({
  commonUI,
  company,
  login,
  teams,
});

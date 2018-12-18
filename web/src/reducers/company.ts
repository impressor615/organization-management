import { Action } from "@/@types/types";
import {
  buildDeptTree,
  DeptProps,
  getDepartments,
} from "@/utils/treeUtils";
import {
  DAB_CHANGE_VIEW,
  REQ_GET_COMPANY_SUCCESS,
  REQ_GET_USERS_SUCCESS,
  REQ_POST_DEPT_SUCCESS,
  REQ_POST_USER_SUCCESS,
} from "@/viewmodels/actionTypes";

export interface State {
  type: string;
  departments: [DeptProps?];
  depts_tree: [DeptProps?];
  parent_depts: [DeptProps?];
  users: object[];
}

export const initialState: State = {
  departments: [],
  depts_tree: [],
  parent_depts: [],
  type: "list",
  users: [],
};

export default function(state: State = initialState, action: Action) {
  let newTree;
  let newParentDepts;

  switch (action.type) {
    case REQ_GET_COMPANY_SUCCESS:
      const { departments = [] } = action.payload || {};
      const deptsTree = buildDeptTree(departments);
      const parentDepts = getDepartments(deptsTree);
      return {
        ...state,
        ...action.payload,
        depts_tree: deptsTree,
        parent_depts: parentDepts,
      };

    case REQ_POST_DEPT_SUCCESS:
      const newDepts = [...state.departments] as [DeptProps?];
      newDepts.push({ ...action.meta, ...action.payload });
      newTree = buildDeptTree(newDepts);
      newParentDepts = getDepartments(newTree);
      return {
        ...state,
        departments: newDepts,
        depts_tree: newTree,
        parent_depts: newParentDepts,
      };

    case REQ_POST_USER_SUCCESS:
      const newUsers = [...state.users];
      newUsers.unshift({ ...action.meta, ...action.payload });
      return {
        ...state,
        users: newUsers,
      };

    case REQ_GET_USERS_SUCCESS:
      return {
        ...state,
        users: [
          ...action.payload,
        ],
      };

    case DAB_CHANGE_VIEW:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

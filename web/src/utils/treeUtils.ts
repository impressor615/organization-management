import cloneDeep from "lodash/cloneDeep";
import groupBy from "lodash/groupBy";

export interface DeptProps {
  _id?: string;
  name?: string;
  collapseItems?: any;
}

export const buildDeptTree = (departments: [DeptProps?]) => {
  const groupedDepts = groupBy([...departments], "parent_id");
  const deptItems = groupedDepts.null ? [...groupedDepts.null] : [];
  Object.keys(groupedDepts).forEach((parentKey) => {
    if (parentKey === "null") {
      return;
    }

    const parent = deptItems.find((item) => item._id === parentKey);
    if (parent) {
      parent.collapseItems = [...groupedDepts[parentKey]];
      return;
    }

    const collapsedParent = deptItems.find((item) => (
      item.collapseItems.find((collapseItem: DeptProps) => collapseItem._id === parentKey)
    )).collapseItems.find((item: DeptProps) => item._id === parentKey);
    collapsedParent.collapseItems = [...groupedDepts[parentKey]];
  });

  return deptItems as [DeptProps?];
};

export const getDepartments = (data: [DeptProps?]) => {
  return data.reduce((result, item) => {
    const newItem = cloneDeep(item);
    const collapseItems = newItem.collapseItems || [];
    collapseItems.forEach((collapseItem: DeptProps) => {
      delete collapseItem.collapseItems;
      result.push(collapseItem);
    });
    delete newItem.collapseItems;
    result.unshift(newItem);
    return result;
  }, [] as [DeptProps?]);
};

export const getChildren = (data: [DeptProps?], targetId: string) => {
  const result = [targetId];
  if (data.length === 0) {
    return result;
  }

  let theDept = data.find((dept: DeptProps) => (dept._id === targetId));
  if (!theDept) {
    const theCollapsedDept = data.find((dept: DeptProps) => (
      (dept.collapseItems || []).find((collapsedDept: DeptProps) => (collapsedDept._id === targetId))
    ));

    if (theCollapsedDept) {
      theDept = theCollapsedDept.collapseItems.find((dept: DeptProps) => dept._id === targetId);
    }
  }

  if (theDept) {
    (theDept.collapseItems || []).forEach((dept: DeptProps) => {
      result.push(dept._id);
      if (dept.collapseItems && dept.collapseItems.length !== 0) {
        dept.collapseItems.forEach((collapsedDept: DeptProps) => {
          result.push(collapsedDept._id);
        });
      }
    });
  }

  return result;
};

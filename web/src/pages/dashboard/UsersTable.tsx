import moment from "moment";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";

import { ConnectProps } from "@/@types/types";
import { StateInterface } from "@/reducers";
import { DeptProps } from "@/utils/treeUtils";

const THEAD = [
  "#",
  "부서",
  "직책",
  "이름",
  "연락처",
  "이메일",
  "생성 일시",
  "상태",
];

interface UserProps {
  _id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  created_at: string;
  department_id: string;
}

interface Props extends ConnectProps {
  users: [UserProps?];
  departments: [DeptProps?];
}

class UsersTable extends PureComponent<Props, {}> {
  public render() {
    const { users, departments } = this.props;
    return (
      <Table hover responsive>
        <thead>
          <tr>
            {
              THEAD.map((header) => (
                <th key={header}>{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{ index + 1 }</th>
                <td>{
                  (departments.find((dept) => dept._id === user.department_id) || {}).name || ""
                }</td>
                <td>{ user.position }</td>
                <td>{ user.name }</td>
                <td>{ user.phone }</td>
                <td>{ user.email }</td>
                <td>{ moment(user.created_at).format("YYYY-MM-DD hh:mm A") }</td>
                <td>-</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  departments: state.company.departments,
  users: state.company.users,
});
export default connect(mapStateToProps)(UsersTable);

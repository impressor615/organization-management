import "@/assets/scss/pages/_dashboard.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { getCompany } from "@/actions";
import SideLayout from "@/components/SideLayout";
import { StateInterface } from "@/reducers";

import Controls from "./Controls";
import UsersTable from "./UsersTable";

export interface Props extends ConnectProps {
  name?: string;
}

class Page extends PureComponent<Props, {}> {
  public async componentDidMount() {
    const { dispatch, history } = this.props;
    const company: DispatchResult = await dispatch(getCompany());
    if (company.error) {
      history.replace("/login");
      return;
    }
  }

  public render() {
    return (
      <SideLayout>
        <div className="dashboard">
          <Container>
            <Controls />
            <UsersTable />
          </Container>
        </div>
      </SideLayout>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  ...state.company,
});
export default withRouter(connect(mapStateToProps)(Page) as any);

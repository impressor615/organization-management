import "@/assets/scss/pages/_dashboard.scss";

import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { getCompany } from "@/actions";
import SideLayout from "@/components/SideLayout";
import { StateInterface } from "@/reducers";

import Controls from "./Controls";
import UsersTable from "./UsersTable";
import UsersTree from "./UsersTree";

const LIST_TYPE = {
  list: "list",
  tree: "tree",
};

export interface Props extends ConnectProps {
  type: string;
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
            { this.renderUsers() }
          </Container>
        </div>
      </SideLayout>
    );
  }

  private renderUsers = () => {
    const { type } = this.props;
    return (
      <Fragment>
        {
          type === LIST_TYPE.list
            ? <UsersTable />
            : <UsersTree />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  ...state.company,
});
export default withRouter(connect(mapStateToProps)(Page) as any);

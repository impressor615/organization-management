import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { getCompany } from "@/actions";
import { StateInterface } from "@/reducers";

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
    const { name } = this.props;
    return (
      <div>{`${name} dashboard`}</div>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({
  ...state.company,
});
export default withRouter(connect(mapStateToProps)(Page) as any);

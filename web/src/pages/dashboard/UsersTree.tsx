import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ConnectProps } from "@/@types/types";
import { StateInterface } from "@/reducers";

class UsersTree extends PureComponent<ConnectProps, {}> {
  public render() {
    return (
      <div>UsersTree</div>
    );
  }
}

const mapStateToProps = (state: StateInterface) => ({});
export default withRouter(connect(mapStateToProps)(UsersTree) as any);

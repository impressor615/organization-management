import "@/assets/scss/pages/teams.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { createTeam, setLoading, showMessage } from "@/actions";
import { StateInterface } from "@/reducers";

import AddButton from "./AddButton";

class Page extends PureComponent<ConnectProps, {}> {
  public render() {
    return (
      <Container className="organizations">
        <AddButton createTeam={this.createTeam} />
      </Container>
    );
  }

  private createTeam = async (data: object) => {
    const { dispatch } = this.props;

    dispatch(setLoading(true));
    const result: DispatchResult = await dispatch(createTeam(data));
    dispatch(setLoading(false));
    if (result.error) {
      return;
    }

    dispatch(showMessage({
      message: "팀 생성이 완료되었습니다.",
      type: "message",
    }));
  }
}

const mapStateToProps = (state: StateInterface) => ({ teams: state.teams });
export default withRouter(connect(mapStateToProps)(Page) as any);

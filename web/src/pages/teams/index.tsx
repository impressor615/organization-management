import "@/assets/scss/pages/teams.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import {
  createTeam,
  getTeams,
  setLoading,
  showMessage,
} from "@/actions";
import { StateInterface } from "@/reducers";
import { TeamProps } from "@/reducers/teams";

import AddButton from "./AddButton";

export interface Props extends ConnectProps {
  teams: [TeamProps?];
}

class Page extends PureComponent<Props, {}> {
  public async componentDidMount() {
    const { history, dispatch } = this.props;
    const result: DispatchResult = await dispatch(getTeams());
    if (result.error) {
      history.replace("/login");
      return;
    }
  }

  public render() {
    const { teams } = this.props;
    return (
      <Container className="teams">
        <h4>팀 추가 및 선택</h4>
        {
          teams.map((team: TeamProps) => (
            <TeamLink {...team} key={team.organization._id} />
          ))
        }
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

const TeamLink = ({ authority, organization }: TeamProps) => (
  <Link
    to={`/teams/${organization._id}`}
    className="teams__link btn btn-secondary"
  >
    {
      authority === "admin" ?
        <FontAwesomeIcon icon="crown" /> : null
    }
    { organization.name }
  </Link>
);

const mapStateToProps = (state: StateInterface) => ({ teams: state.teams.teams });
export default withRouter(connect(mapStateToProps)(Page) as any);

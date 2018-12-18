import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { ConnectProps } from "@/@types/types";
import { logout } from "@/actions";

interface States {
  isOpen: boolean;
}

class Page extends PureComponent<ConnectProps, States> {
  public state = {
    isOpen: true,
  };

  public render() {
    const { isOpen } = this.state;
    return (
      <Modal isOpen={isOpen} size="sm">
        <ModalHeader>로그아웃</ModalHeader>
        <Form onSubmit={this.logout}>
          <ModalBody>로그아웃 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">확인</Button>
            <Button color="secondary" onClick={this.goBack}>취소</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  private logout = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { dispatch, history } = this.props;
    localStorage.removeItem("__oc-chart");
    dispatch(logout());
    history.replace("/login");
  }

  private goBack = () => {
    const { history } = this.props;
    history.goBack();
  }
}

const mapStateToProps = () => ({});
export default withRouter(connect(mapStateToProps)(Page) as any);

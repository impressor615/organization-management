import "@/assets/scss/pages/_login.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { ConnectProps, DispatchResult } from "@/@types/types";
import { login, setLoading } from "@/actions";
import { StateInterface } from "@/reducers";

interface States {
  email: string;
  password: string;
}

class Page extends PureComponent<ConnectProps, States> {
  public state = {
    email: "",
    password: "",
  };

  public componentDidMount() {
    const { history } = this.props;
    const { access_token }: { access_token: string } = JSON.parse(localStorage.getItem("__oc-chart")) || {};
    if (access_token) {
      history.replace("/dashboard");
    }
  }

  public render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <Container className="login">
        <Form onSubmit={this.onSubmit}>
          <h1>로그인</h1>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
              placeholder="이메일 입력"
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              placeholder="비밀번호 입력"
            />
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            disabled={loading}
            block
          >
            로그인
          </Button>
          <Link to="/register">아직 가입하지 않으셨나요?</Link>
        </Form>
      </Container>
    );
  }

  private onChange = (e: React.ChangeEvent): void => {
    e.stopPropagation();
    const { name, value }: any = e.target;
    this.setState({ [name]: value } as Pick<States, keyof States>);
  }

  private onSubmit = async (e: React.FormEvent): Promise<string> => {
    e.preventDefault();
    e.stopPropagation();
    const { email, password } = this.state;
    const { dispatch, history } = this.props;

    const postData = { email, password };

    dispatch(setLoading(true));
    const result: DispatchResult = await dispatch(login(postData));
    dispatch(setLoading(false));
    if (result.error) {
      return;
    }
    const accessToken = result.payload.access_token;
    localStorage.setItem("__oc-chart", JSON.stringify({ access_token: accessToken }));
    history.push("/dashboard");
    return;
  }
}

const mapStateToProps = (state: StateInterface) => ({
  loading: state.commonUI.loading,
});
export default withRouter(connect(mapStateToProps)(Page) as any);

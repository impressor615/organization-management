import "@/assets/scss/pages/_register.scss";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { ConnectProps } from "@/@types/types";
import { register, setLoading, showMessage } from "@/actions";
import { StateInterface } from "@/reducers";

interface States {
  email: string;
  password: string;
  passwordCheck: string;
  isValid: boolean;
}

class Page extends PureComponent<ConnectProps, States>  {
  public state: States = {
    email: "",
    isValid: true,
    password: "",
    passwordCheck: "",
  };

  public render() {
    const { loading } = this.props;
    const { isValid } = this.state;
    return (
      <Container className="register">
        <Form onSubmit={this.onSubmit}>
          <h1>회원가입</h1>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              placeholder="이메일 입력"
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              onChange={this.onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인 입력"
              onChange={this.onPasswordCheckChange}
              invalid={!isValid}
              required
            />
            <FormFeedback>* 비밀번호와 비밀번호 확인이 일치해야 합니다.</FormFeedback>
          </FormGroup>
          <Button
            block
            type="submit"
            color="primary"
            disabled={loading}
          >
            회원가입하기
          </Button>
          <Link to="/login">로그인 하러 가기</Link>
        </Form>
      </Container>
    );
  }

  private onChange = (e: React.ChangeEvent): void => {
    e.stopPropagation();

    const { name, value }: any = e.target;
    this.setState({ [name]: value } as Pick<States, keyof States>);
  }

  private onPasswordCheckChange = (e: React.ChangeEvent): void => {
    e.stopPropagation();

    const { password } = this.state;
    const { value }: any = e.target;
    const newState = {
      isValid: password === value,
      passwordCheck: value,
    };
    this.setState({ ...newState });
  }

  private validate = (): boolean => {
    const { password, passwordCheck } = this.state;
    return password === passwordCheck;
  }

  private onSubmit = async (e: React.FormEvent): Promise<string> => {
    e.preventDefault();
    if (!this.validate()) {
      this.setState({ isValid: false });
      return;
    }

    const {
      email,
      password,
      passwordCheck,
    } = this.state;
    const { dispatch, history } = this.props;

    const postData = {
      email,
      password,
      passwordCheck,
    };

    dispatch(setLoading(true));
    const result = await dispatch(register(postData));
    dispatch(setLoading(false));
    if (result.error) {
      return;
    }

    history.push("/login");
    dispatch(showMessage({
      message: "가입이 완료되었습니다. 로그인하세요.",
      type: "message",
    }));
    return;
  }

}

const mapStateToProps = (state: StateInterface) => ({
  loading: state.commonUI.loading,
});
export default withRouter(connect(mapStateToProps)(Page) as any);

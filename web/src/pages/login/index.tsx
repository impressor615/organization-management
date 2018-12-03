import "@/assets/scss/pages/_login.scss";

import React, { PureComponent } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class Page extends PureComponent {
  public render() {
    return (
      <Container className="login">
        <Form>
          <h1>로그인</h1>
          <FormGroup>
            <Label>아이디</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" />
          </FormGroup>
          <Button type="submit" color="primary" block>
            로그인
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Page;

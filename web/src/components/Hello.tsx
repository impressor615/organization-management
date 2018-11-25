import * as React from "react";
import { Button } from "reactstrap";
const { Fragment } = React;

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => (
  <Fragment>
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
    <Button>Button</Button>
  </Fragment>
);

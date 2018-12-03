import * as React from "react";
import { Button } from "reactstrap";

import tsImage from "@/assets/images/typescript.png";

const { Fragment } = React;

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => (
  <Fragment>
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
    <Button>Button</Button>
    <img src={tsImage} />
  </Fragment>
);

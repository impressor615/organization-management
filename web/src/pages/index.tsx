import React, { PureComponent } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";

class App extends PureComponent {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;

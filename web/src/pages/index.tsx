import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import configureStore from "@/configureStore";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";

const Store = configureStore({});
class App extends PureComponent {
  public render() {
    return (
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

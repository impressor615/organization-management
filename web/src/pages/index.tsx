import React, { Fragment, PureComponent } from "react";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Message from "@/components/Message";
import configureStore from "@/configureStore";
import Login from "@/pages/login";
import Logout from "@/pages/logout";
import Register from "@/pages/register";

const Store = configureStore({});
class App extends PureComponent {
  public render() {
    return (
      <Provider store={Store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/logout" component={Logout} />
              <Redirect to="/login" />
            </Switch>
            <Message />
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { getCurrentUser } from "./services/authServices";
import Login from "./components/loginForm";
import SignUp from "./components/signUp";
import ProjectForm from "./components/projectForm";
import Home from "./components/Home";
import UserDisplay from "./components/usersDisplay";
import SideNav from "./components/sidenav";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    const user = getCurrentUser();
    if (user)
      this.setState({
        user
      });
  }

  render() {
    return (
      <div>
        {this.state.user && <SideNav user={this.state.user} />}
        {/* <Header user={this.state.user} /> */}
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            component={props => <Home user={this.state.user} {...props} />}
          />
          <ProtectedRoute
            path="/:user"
            exact
            component={props => <Home user={this.state.user} {...props} />}
          />
          <Route path="/login" exact render={props => <Login {...props} />} />
          <Route
            path="/register"
            exact
            render={props => <SignUp {...props} />}
          />
          <ProtectedRoute
            path="/project/new"
            exact
            component={props => (
              <ProjectForm users={this.state.users} {...props} />
            )}
          />
          <ProtectedRoute
            path="/project/:id"
            component={props => (
              <ProjectForm users={this.state.users} {...props} />
            )}
          />
          <ProtectedRoute
            path="/users"
            render={props => (
              <UserDisplay users={this.state.users} {...props} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

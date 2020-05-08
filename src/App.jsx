import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as http from './services/postsServices';
import './App.css';
import { getCurrentUser } from './services/authServices';
import Login from './components/loginForm';
import SignUp from './components/signUp';
import ProjectForm from './components/projectForm';
import Home from './components/Home';
import UserDisplay from './components/usersDisplay';
import SideNav from './components/sidenav';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    let user = getCurrentUser();
    if (user) {
      user = await http.getUser(user._id);
      user = user.data;
      this.setState({
        user,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.user.name && <SideNav user={this.state.user} />}
        {/* <NavBar user={this.state.user} /> */}
        <ToastContainer />
        <Switch>
          <ProtectedRoute
            path='/'
            exact
            component={(props) => <Home user={this.state.user} {...props} />}
          />
          <Route path='/login' exact render={(props) => <Login {...props} />} />
          <Route
            path='/register'
            exact
            render={(props) => <SignUp {...props} />}
          />
          <ProtectedRoute
            path='/project/new'
            exact
            component={(props) => (
              <ProjectForm user={this.state.user} {...props} />
            )}
          />
          <ProtectedRoute
            path='/project/:id'
            component={(props) => (
              <ProjectForm user={this.state.user} {...props} />
            )}
          />
          <ProtectedRoute
            path='/users'
            render={(props) => (
              <UserDisplay user={this.state.user} {...props} />
            )}
          />
          <ProtectedRoute
            path='/:user'
            exact
            component={(props) => <Home user={this.state.user} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

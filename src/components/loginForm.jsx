import React from 'react';
import auth, { loginWithJwt } from '../services/authServices';
import { getLoginSchema } from '../services/formSchema';
import Form from './common/form';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

class Login extends Form {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };
  schema = getLoginSchema();

  // default method handle the onSubmit function call in a form
  async doSubmit() {
    try {
      const response = await auth.login(this.state.data);
      loginWithJwt(response.headers['todo-auth-token']);
      window.location = '/';
    } catch (error) {
      const { response: err } = error;
      let errors = { ...this.state.errors };
      if (err) {
        if (err.status === 401) {
          NProgress.done();
          errors.password = 'User pending approval';
          return this.setState({
            errors,
          });
        } else {
          NProgress.done();
          errors.password = 'Incorrect email or password';
          return this.setState({
            errors,
          });
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* renders the react form */}

        <div className='auth-form'>
          <Paper className='paper'>
            <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
              {this.inputField('email', 'Email')}
              {this.inputField('password', 'Password')}
              {this.renderButton('Login')}
            </form>
            <span>Don't have an account? ,</span>
            <Link to='/register'>Register</Link>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

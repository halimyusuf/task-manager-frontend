import React from 'react';
import Paper from '@material-ui/core/Paper';
import auth from '../services/authServices';
import { getSignUpSchema } from '../services/formSchema';
import { Link } from 'react-router-dom';
import Form from './common/form';

class SignUp extends Form {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      position: '',
    },
    errors: {},
  };

  schema = getSignUpSchema();

  async doSubmit() {
    try {
      await auth.register(this.state.data);
      this.props.history.push('/login');
    } catch (error) {
      const { response: err } = error;
      if (err) {
        let errors = { ...this.state.errors };
        errors.email = 'User with email exists';
        return this.setState({
          errors,
        });
      }
      //   toast.error("Unexpected error");
    }
  }

  render() {
    return (
      <div className='auth-form'>
        <Paper className='paper'>
          <form onSubmit={this.handleSubmit}>
            {this.inputField('name', 'Name')}
            {this.inputField('email', 'Email')}
            {this.inputField('password', 'Password')}
            {this.inputField('position', 'Position')}
            {this.renderButton('Submit')}
          </form>
          <span>ALready have an account? </span>
          <Link to='/login'>Login</Link>
        </Paper>
      </div>
    );
  }
}

export default SignUp;

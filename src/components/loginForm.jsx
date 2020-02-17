import React from "react";
import auth, { loginWithJwt } from "../services/authServices";
import { getLoginSchema } from "../services/formSchema";
import Form from "./common/form";
import { Link } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };
  schema = getLoginSchema();
  async doSubmit() {
    console.log("submitted");
    try {
      const response = await auth.login(this.state.data);
      loginWithJwt(response.headers["todo-auth-token"]);
      // console.log("eyahah");
      window.location = "/";
    } catch (error) {
      const { response: err } = error;
      let errors = { ...this.state.errors };
      if (err.status === 401) {
        errors.password = "User pending approval";
        return this.setState({
          errors
        });
      } else {
        errors.password = "Incorrect email or password";
        return this.setState({
          errors
        });
      }
      //   toast.error("Unexpected error");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="auth-form">
          <form onSubmit={this.handleSubmit}>
            {this.inputField("email", "Email")}
            {this.inputField("password", "Password")}
            {this.renderButton("Login")}
          </form>
          <Link to="/register">Register</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

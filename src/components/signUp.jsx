import React from "react";

import auth from "../services/authServices";
import { getSignUpSchema } from "../services/formSchema";
import Form from "./common/form";

class SignUp extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      position: ""
    },
    errors: {}
  };

  schema = getSignUpSchema();

  async doSubmit() {
    try {
      await auth.register(this.state.data);
      this.props.history.push("/login");
    } catch (error) {
      const { response: err } = error;
      if (err) {
        let errors = { ...this.state.errors };
        errors.email = "User with email exists";
        return this.setState({
          errors
        });
      }
      //   toast.error("Unexpected error");
    }
  }

  render() {
    return (
      <div className="auth-form">
        <form onSubmit={this.handleSubmit}>
          {this.inputField("name", "Name")}
          {this.inputField("email", "Email")}
          {this.inputField("password", "Password")}
          {this.inputField("position", "Position")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default SignUp;

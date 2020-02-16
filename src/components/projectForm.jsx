import React from "react";
import { getProjectSchema } from "../services/formSchema";
import { getFormDate } from "../utils/formatTime";
import Form from "./common/form";
import * as http from "../services/postsServices";

class ProjectForm extends Form {
  state = {
    data: {
      name: "",
      vendor: "",
      owner: "",
      description: "",
      startDate: "",
      endDate: ""
    },
    errors: {},
    ownerOptions: []
  };

  async componentDidMount() {
    try {
      const response = await http.getUsers();
      const users = response.data;

      const id = this.props.match.params.id;
      if (id) {
        let project = await http.getProject(id);
        console.log("project", project);
        project = project.data;
        if (project) {
          const data = { ...this.state.data };
          data.name = project.name;
          data.vendor = project.vendor;
          data.owner = project.owner;
          data.name = project.name;
          data.description = project.description;
          data.startDate = "";
          data.endDate = "";
          data._id = project._id;
          this.setState({
            data,
            ownerOptions: users,
            errors: []
          });
        }
      } else {
        this.setState({
          ownerOptions: users,
          errors: []
        });
      }
    } catch (error) {
      const { response: err } = error;
      console.log(err);
    }
  }
  schema = getProjectSchema();
  doSubmit = async () => {
    try {
      const response = await http.saveProject(this.state.data);
      console.log(response);
      console.log("submitted");
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
    //   toast.error("Unexpected error");
  };

  render() {
    return (
      <div className="auth-form">
        <form onSubmit={this.handleSubmit}>
          {this.inputField("name", "Name")}
          {this.selectField("owner", "Owner", this.state.ownerOptions)}
          {this.inputField("vendor", "Vendor")}
          {this.renderTextArea("description", "Enter project description")}
          {this.inputField("startDate", "Start", "date")}
          {this.inputField("endDate", "End", "date")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default ProjectForm;

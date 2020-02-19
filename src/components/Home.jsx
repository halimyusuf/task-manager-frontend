import React, { Component } from "react";
import Project from "./project";
import "./home.css";

class Home extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Project param={this.props.match.params} user={user} />
      </React.Fragment>
    );
  }
}

export default Home;

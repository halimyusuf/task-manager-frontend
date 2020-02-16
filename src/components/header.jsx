import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    let user = this.props.user;
    console.log(this.props);
    if (user) user = user._id;
    return <h1>Welcome {user}</h1>;
  }
}

export default Header;

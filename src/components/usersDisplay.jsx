import React, { Component } from "react";
import "./userDisplay.css";
import * as http from "../services/postsServices";

class UserDisplay extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    try {
      const users = await http.getUsers();
      console.log(users.data);
      this.setState({
        users: users.data
      });
    } catch (error) {}
  }

  handleApprove = async id => {
    try {
      const approve = await http.approveUser(id);
      console.log(approve);
      this.componentDidMount();
    } catch (error) {}
  };
  render() {
    const { users } = this.state;
    return (
      <div className="users-display">
        {users.map(user => (
          <div className="user-display" key={user._id}>
            <h4>Name: {user.name}</h4>
            <p>Email: {user.email}</p>
            <p>Position: {user.position} </p>
            {user.approved || (
              <button onClick={() => this.handleApprove(user._id)}>
                Approve
              </button>
            )}
            {!user.approved || (
              <button onClick={() => this.handleApprove(user._id)}>
                Revoke access
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default UserDisplay;

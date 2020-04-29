import React, { Component } from 'react';
import './userDisplay.css';
import * as http from '../services/postsServices';

class UserDisplay extends Component {
  state = {
    users: [],
  };
  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const users = await http.getUsers();
      this.setState({
        users: users.data,
      });
    } catch (error) {}
  };

  handleApprove = async (id) => {
    try {
      await http.approveUser(id);
      this.componentDidMount();
    } catch (error) {}
  };

  handleUserDel = async (id) => {
    try {
      await http.deleteUser(id);
      this.getUsers();
    } catch (error) {}
  };
  render() {
    const { users } = this.state;
    let { user: userId } = this.props;
    userId = userId === undefined ? {} : userId;
    return (
      <div className='users-display'>
        {users.map((user) => (
          <div className='user-display' key={user._id}>
            <h4>Name: {user.name}</h4>
            <p>Email: {user.email}</p>
            <p>Position: {user.position} </p>
            {userId.isAdmin && !user.approved && (
              <React.Fragment>
                <button onClick={() => this.handleApprove(user._id)}>
                  Approve
                </button>
              </React.Fragment>
            )}
            {userId.isAdmin && user.approved && (
              <button onClick={() => this.handleApprove(user._id)}>
                Revoke access
              </button>
            )}
            {userId.isAdmin && (
              <button
                className='delete'
                onClick={() => this.handleUserDel(user._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default UserDisplay;

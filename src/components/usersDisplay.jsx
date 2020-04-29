import React, { Component } from 'react';
import './userDisplay.css';
import * as http from '../services/postsServices';
// material imports
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import BusinessIcon from '@material-ui/icons/Business';

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
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  {user.name}
                </Typography>
                <Typography color='textPrimary'>
                  {' '}
                  <MailIcon /> {user.email}
                </Typography>
                <Typography variant='body2' color='textPrimary'>
                  <BusinessIcon /> {user.position}
                </Typography>
              </CardContent>
              <CardActions>
                {userId.isAdmin && !user.approved && (
                  <React.Fragment>
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => this.handleApprove(user._id)}
                    >
                      Approve
                    </Button>
                  </React.Fragment>
                )}

                {userId.isAdmin && user.approved && (
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => this.handleApprove(user._id)}
                  >
                    Revoke access
                  </Button>
                )}
                {userId.isAdmin && (
                  <Button
                    size='small'
                    color='secondary'
                    // className='delete'
                    onClick={() => this.handleUserDel(user._id)}
                  >
                    Delete
                  </Button>
                )}
                {/* <Button size='small'>Learn More</Button> */}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default UserDisplay;

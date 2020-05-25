import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavBar from './NavBar';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
const SideNav = ({ user }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* <ListItem button>
          <ListItemIcon>
            <i className='fa fa-project'></i>
            <i className='fa fa-caret-down'></i>
          </ListItemIcon>
          <ListItemText primary={'Projects'} />
        </ListItem> */}
        {user.isAdmin && (
          <ListItem button>
            <Link to='/project/new' className='w3-bar-item w3-button'>
              <ListItemText primary='New Project' />
            </Link>
          </ListItem>
        )}
        <ListItem button>
          <Link to='/' className='w3-bar-item w3-button'>
            <ListItemText primary='All projects' />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='/my-projects' className='w3-bar-item w3-button'>
            {' '}
            <ListItemText primary='My Projects' />{' '}
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link to='/users' className='w3-bar-item w3-button'>
            <ListItemIcon>
              {/* <i className='fa fa-users'></i> */}
              <ListItemText primary='Users' />
            </ListItemIcon>
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='' className='w3-bar-item w3-button' onClick={Logout}>
            <ListItemIcon>
              {/* <i className='fa fa-sign-out'></i> */}
              <ListItemText primary='Logout' />
            </ListItemIcon>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <div>
        <React.Fragment key={'left'}>
          <NavBar user={user} toggleSide={toggleDrawer} />
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </div>
  );
};

export default SideNav;

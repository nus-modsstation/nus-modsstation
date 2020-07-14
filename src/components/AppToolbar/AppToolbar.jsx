import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutStart } from '../../redux/user/user.action';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}));

const Appbar = ({ currentUser, logoutStart, history }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutStart();
    handleClose();
  };

  const navigateToHomePage = () => {
    history.push('/');
  };

  const navigateToLoginPage = () => {
    history.push('/login');
    handleClose();
  };

  const navigateToChatRoomPage = () => {
    history.push('/chat-room');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={navigateToHomePage}
            variant="h6"
            className={classes.title}
          >
            NUS ModsStation
          </Typography>
          <div>
            <IconButton
              onClick={navigateToChatRoomPage}
              aria-label="show 4 new mails"
              color="inherit"
            >
              <MailIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {currentUser && (
                <MenuItem
                  onClick={handleClose}
                >{`Hi, ${currentUser.username}`}</MenuItem>
              )}
              {currentUser ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={navigateToLoginPage}>Login</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutStart: () => dispatch(logoutStart()),
});

const AppToolbarWithRouter = withRouter(Appbar);

export const AppToolbar = connect(
  null,
  mapDispatchToProps
)(AppToolbarWithRouter);

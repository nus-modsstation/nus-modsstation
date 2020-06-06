import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

const BottomNav = ({ location }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(location.pathname);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log(location.pathname);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={NavLink}
        to="/study-group"
        value="/study-group"
        label="Study Group"
        icon={<LocalLibraryIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/virtual-group"
        value="/virtual-group"
        label="Virtual Group"
        icon={<ContactMailIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/qa-thread"
        value="/qa-thread"
        label="Q&A Thread"
        icon={<QuestionAnswerIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/dashboard"
        value="/dashboard"
        label="Dashboard"
        icon={<DashboardIcon />}
      />
    </BottomNavigation>
  );
};

export const BottomNavbar = withRouter(BottomNav);

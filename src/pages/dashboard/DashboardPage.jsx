import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { capSentence } from '../../utils/formatString';

import { Dashboard } from '../../models/Dashboard';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { readMyGroups } from '../../redux/studyGroup/studyGroup.action';
import { selectMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.selector';
import { readMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.action';

import { makeStyles } from '@material-ui/core/styles';
import { materialStyles } from '../../styles/material.styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { AddModuleDialog } from '../../components/AddModuleDialog/AddModuleDialog';
import { StudyGroupSection } from '../../components/StudyGroupSection/StudyGroupSection';
import { VirtualGroupCard } from '../../components/VirtualGroupCard/VirtualGroupCard';

const dashboardStyles = makeStyles({
  cardsSection: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      borderRadius: 8,
      backgroundColor: 'gray',
    },
  },
});

const DashboardPageComponent = ({
  currentUser,
  myStudyGroups,
  readMyStudyGroups,
  myVirtualGroups,
  readMyVirtualGroups,
}) => {
  const dashboardClasses = dashboardStyles();
  const materialClasses = materialStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = Dashboard.options;

  useEffect(() => {
    // fetch user's study groups, virtual groups and Q&A Threads
    // call this when variables change by providing the varaibles in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyStudyGroups(currentUser.id);
      readMyVirtualGroups(currentUser.id);
    }
  }, [currentUser, readMyStudyGroups, readMyVirtualGroups]);

  return (
    <Box className={materialClasses.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={10} sm={11} md={12} item>
              <Searchbar currentUser={currentUser} searchCallback={() => {}} />
            </Grid>
            <Grid xs={2} sm={1} item>
              <Hidden mdUp>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              </Hidden>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.title} onClick={option.clickCallback}>
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText primary={option.title} />
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">My modules</Typography>
                  <AddModuleDialog />
                </Box>
                <Box>
                  <List>
                    {currentUser &&
                      currentUser.modules
                        .filter((moduleCode) => moduleCode !== 'MOD1001')
                        .map((module) => (
                          <ListItem key={module}>
                            <ListItemText primary={module} />
                          </ListItem>
                        ))}
                  </List>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>
                <StudyGroupSection
                  sectionTitle="My study groups"
                  sectionData={myStudyGroups}
                  hideJoin
                />
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box mb={1}>
                      <Typography variant="h6">
                        {capSentence('My virtual groups')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <Box
                      overflow="auto"
                      className={dashboardClasses.cardsSection}
                    >
                      {myVirtualGroups && myVirtualGroups.length > 0 ? (
                        myVirtualGroups.map((group, index) => (
                          <VirtualGroupCard
                            currentUser={currentUser}
                            key={index}
                            groupData={group}
                          />
                        ))
                      ) : (
                        <Box width={1}>
                          <Alert severity="info">
                            Whoops! Looks like you have not joined any virtual
                            group yet.
                          </Alert>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>Q&A Threads</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md={4}>
            <Paper className={materialClasses.paper}>
              <Typography variant="h6">Options</Typography>
              <List component="nav" aria-label="main mailbox folders">
                {options.map((option) => {
                  return (
                    <ListItem
                      key={option.title}
                      onClick={option.clickCallback}
                      button
                    >
                      <ListItemIcon>{option.icon}</ListItemIcon>
                      <ListItemText primary={option.title} />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myStudyGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  readMyStudyGroups: (userId) => dispatch(readMyGroups(userId)),
  readMyVirtualGroups: (userId) => dispatch(readMyVirtualGroups(userId)),
});

export const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPageComponent);

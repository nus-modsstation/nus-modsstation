import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { capSentence } from '../../utils/formatString';

import { fetchUserStart } from '../../redux/user/user.action';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { readMyGroups } from '../../redux/studyGroup/studyGroup.action';
import { selectMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.selector';
import { readMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.action';
import {
  selectMyQAThreads,
  selectMyStarredQAThreads,
} from '../../redux/qaThread/qaThread.selector';
import {
  readMyQAThreads,
  readMyStarredQAThreads,
} from '../../redux/qaThread/qaThread.action';

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
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import { AddModuleDialog } from '../../components/AddModuleDialog/AddModuleDialog';
import { StudyGroupSection } from '../../components/StudyGroupSection/StudyGroupSection';
import { VirtualGroupCard } from '../../components/VirtualGroupCard/VirtualGroupCard';
import { QAThreadCard } from '../../components/QAThreadCard/QAThreadCard';
import { FriendsDialog } from '../../components/FriendsDialog/FriendsDialog';

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
  myThreads,
  readMyThreads,
  starredThreads,
  readMyStarredThreads,
  fetchUserStart,
}) => {
  const dashboardClasses = dashboardStyles();
  const materialClasses = materialStyles();
  const [anchorEl, setAnchorEl] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const options = [
    {
      title: 'Guides',
      icon: <ViewCarouselIcon />,
      clickCallback: () => {
        setAnchorEl(false);
        window.open(
          'https://docs.google.com/document/d/1_yXMxVcF_Xv5KlXcySzEM7wqrTtfKkT_SPNUpIvS3Jg/edit?usp=sharing',
          '_blank'
        );
      },
    },
    {
      title: 'Friends',
      icon: <PeopleAltIcon />,
      clickCallback: () => {
        setAnchorEl(false);
        setOpenDialog(true);
      },
    },
    {
      title: 'Contact us',
      icon: <LiveHelpIcon />,
      clickCallback: () => {
        window.open(
          'mailto:nusmodsstation@gmail.com?' +
            '&subject=[Feedback] Hello, NUS ModsStation!' +
            '&body=Hi NUS ModsStation team,'
        );
      },
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // fetch user's study groups, virtual groups and Q&A Threads
    // call this when variables change by providing the varaibles in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyStudyGroups(currentUser.id);
      readMyVirtualGroups(currentUser.id);
      readMyThreads(currentUser.id);
      readMyStarredThreads(currentUser.id);
    }
  }, [
    currentUser,
    readMyStudyGroups,
    readMyVirtualGroups,
    readMyThreads,
    readMyStarredThreads,
  ]);

  useEffect(() => {
    // fetch current user information from Firestore
    if (currentUser) {
      fetchUserStart(currentUser.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box className={materialClasses.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={12} item>
              <Hidden mdUp>
                <Box
                  width={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">Dashboard</Typography>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
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
                <Grid container>
                  <Grid item xs={12}>
                    <Box mb={1} display="flex" justifyContent="space-between">
                      <Typography variant="h6">My modules</Typography>
                      {currentUser && <AddModuleDialog />}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    {currentUser && currentUser.modules.length > 0 ? (
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
                    ) : currentUser ? (
                      <Box width={1}>
                        <Alert severity="info">
                          Whoops! Looks like you have not added any module yet.
                        </Alert>
                      </Box>
                    ) : (
                      <Box width={1}>
                        <Alert severity="info">
                          Whoops! Looks like you have not logged in to NUS
                          ModsStation yet.
                        </Alert>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>
                {myStudyGroups && myStudyGroups.length > 0 ? (
                  <StudyGroupSection
                    sectionTitle="My study groups"
                    sectionData={myStudyGroups}
                    hideJoin
                  />
                ) : (
                  <Grid container>
                    <Grid item xs={12}>
                      <Box mb={1}>
                        <Typography variant="h6">
                          {capSentence('My study groups')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box width={1}>
                        <Alert severity="info">
                          Whoops! Looks like you have not joined any study group
                          yet.
                        </Alert>
                      </Box>
                    </Grid>
                  </Grid>
                )}
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
                  <Grid item xs={12}>
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
              <Paper className={materialClasses.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box mb={1}>
                      <Typography variant="h6">
                        {capSentence('My Q&A threads')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      overflow="auto"
                      className={dashboardClasses.cardsSection}
                    >
                      {myThreads && myThreads.length > 0 ? (
                        myThreads.map((thread, index) => (
                          <QAThreadCard
                            currentUser={currentUser}
                            key={index}
                            thread={thread}
                          />
                        ))
                      ) : (
                        <Box width={1}>
                          <Alert severity="info">
                            Whoops! Looks like you have not initiated any Q&A
                            thread yet.
                          </Alert>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box mb={1}>
                      <Typography variant="h6">
                        {capSentence('Starred Q&A threads')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      overflow="auto"
                      className={dashboardClasses.cardsSection}
                    >
                      {starredThreads && starredThreads.length > 0 ? (
                        starredThreads.map((thread, index) => (
                          <QAThreadCard
                            currentUser={currentUser}
                            key={index}
                            thread={thread}
                          />
                        ))
                      ) : (
                        <Box width={1}>
                          <Alert severity="info">
                            Whoops! Looks like you have not starred any Q&A
                            thread yet.
                          </Alert>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box textAlign="center">
              <Typography variant="h6">Options</Typography>
            </Box>
            <List dense component="nav">
              {options.map((option) => {
                return (
                  <ListItem
                    key={option.title}
                    onClick={option.clickCallback}
                    button
                  >
                    <Box width={1}>
                      <Paper className={materialClasses.paper}>
                        <Box display="flex" flexDirection="row">
                          <ListItemIcon>{option.icon}</ListItemIcon>
                          <ListItemText primary={option.title} />
                        </Box>
                      </Paper>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Hidden>
      </Grid>
      <FriendsDialog
        openDialog={openDialog}
        currentUser={currentUser}
        closeCallback={() => setOpenDialog(false)}
      />
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myStudyGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
  myThreads: selectMyQAThreads,
  starredThreads: selectMyStarredQAThreads,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  readMyStudyGroups: (userId) => dispatch(readMyGroups(userId)),
  readMyVirtualGroups: (userId) => dispatch(readMyVirtualGroups(userId)),
  readMyThreads: (userId) => dispatch(readMyQAThreads(userId)),
  readMyStarredThreads: (userId) => dispatch(readMyStarredQAThreads(userId)),
  fetchUserStart: (userId) => dispatch(fetchUserStart(userId)),
});

export const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPageComponent);

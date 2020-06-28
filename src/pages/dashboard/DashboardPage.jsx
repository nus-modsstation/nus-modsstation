import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Dashboard } from '../../models/Dashboard';
import { StudyGroup } from '../../models/StudyGroup';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { readMyGroups } from '../../redux/studyGroup/studyGroup.action';

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
import { Searchbar } from '../../components/Searchbar/Searchbar';
import { AddModuleDialog } from '../../components/AddModuleDialog/AddModuleDialog';
import { StudyGroupSection } from '../../components/StudyGroupSection/StudyGroupSection';

const DashboardPageComponent = ({ currentUser, myGroups, readMyGroups }) => {
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
    // fetch my, live and module-specific study groups
    // call this when variables change by providing the varaibles in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
    }
  }, [currentUser, readMyGroups]);

  return (
    <Box className={materialClasses.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={10} sm={11} md={12} item>
              <Searchbar searchOptions={StudyGroup.searchOptions} />
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
                      currentUser.modules.map((module) => (
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
                {currentUser && myGroups.length > 0 && (
                  <StudyGroupSection
                    sectionTitle="My study groups"
                    sectionData={myGroups}
                    hideJoin
                  />
                )}
              </Paper>
            </Grid>
            <Grid xs={12} item>
              <Paper className={materialClasses.paper}>Virtual groups</Paper>
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
  myGroups: selectMyGroups,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  readMyGroups: (userId) => dispatch(readMyGroups(userId)),
});

export const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPageComponent);

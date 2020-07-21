import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  selectMyQAThreads,
  selectQAThreadsByModule,
  selectMyStarredQAThreads,
} from '../../redux/qaThread/qaThread.selector';
import {
  readMyQAThreads,
  readMyStarredQAThreads,
  readQAThreadsByModule,
} from '../../redux/qaThread/qaThread.action';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { makeStyles } from '@material-ui/core/styles';
import { materialStyles } from '../../styles/material.styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';
// import { ClickAwayListener } from '@material-ui/core';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { QAThreadDialog } from '../../components/QAThreadDialog/QAThreadDialog';
import { QAThreadModule } from '../../components/QAThreadModule/QAThreadModule';
import { YourQAThread } from '../../components/YourQAThread/YourQAThread';
import { YourQAThreadSmall } from '../../components/YourQAThreadSmall/YourQAThreadSmall';

const liveThreadsStyles = makeStyles({
  list: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const yourThreadsStyles = makeStyles({
  list: {
    height: 200,
    margin: '20px 0px',
    overflow: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const QAThreadPageComponent = ({
  myThreads,
  starredThreads,
  currentUser,
  readMyThreads,
  readMyStarredThreads,
  readThreadsByModule,
  qaThreadsByModule,
}) => {
  const materialClasses = materialStyles();
  const liveThreadsClasses = liveThreadsStyles();
  const yourThreadsClasses = yourThreadsStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [anotherAnchorEl, setAnotherAnchorEl] = React.useState(null);
  const [anotherOpen, setAnotherOpen] = React.useState(false);
  const [searchQueries, setSearchQueries] = React.useState(
    currentUser ? currentUser.modules : []
  );

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleAnotherClick = (event) => {
    setAnotherOpen((prev) => !prev);
    setAnotherAnchorEl(event.currentTarget);
  };

  /*
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleAnotherClickAway = () => {
    setAnotherOpen(false);
  };
  */

  // filter user modules by searchbar selection(s)
  const searchCallback = (searchData) => {
    console.log('search:', searchData);
    if (searchData.value !== null) {
      console.log('searchData.value:', searchData.value);
      // const results = currentUser.modules.filter((moduleCode) =>
      //   searchData.value.map((module) => module.option).includes(moduleCode)
      // );
      const moduleCode = searchData.value.moduleCode;
      setSearchQueries([moduleCode]);
    } else {
      setSearchQueries(currentUser.modules);
    }
  };

  useEffect(() => {
    // fetch threads by module and my threads
    // call this when variables change by providing the variables in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyThreads(currentUser.id);
      readMyStarredThreads(currentUser.id);
      currentUser.modules.forEach((moduleCode) =>
        readThreadsByModule(moduleCode)
      );
    }
  }, [currentUser, readThreadsByModule, readMyThreads, readMyStarredThreads]);

  return (
    <Box className={materialClasses.root}>
      <Hidden mdUp>
        <Popper open={open} anchorEl={anchorEl} placement="bottom">
          <YourQAThreadSmall myThreads={myThreads} />
        </Popper>
      </Hidden>
      <Hidden mdUp>
        <Popper
          open={anotherOpen}
          anchorEl={anotherAnchorEl}
          placement="bottom"
        >
          <YourQAThreadSmall myThreads={starredThreads} />
        </Popper>
      </Hidden>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} md={9}>
          <Hidden mdUp>
            <Box my="4px">
              <Button
                onClick={handleClick}
                variant="outlined"
                fullWidth
                size="small"
              >
                <Typography variant="button">My threads</Typography>
              </Button>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box my="4px">
              <Button
                onClick={handleAnotherClick}
                variant="outlined"
                fullWidth
                size="small"
              >
                <Typography variant="button">Starred threads</Typography>
              </Button>
            </Box>
          </Hidden>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={10} md={11}>
              <Searchbar
                currentUser={currentUser}
                searchCallback={searchCallback}
              />
            </Grid>
            <Grid item xs={2} md={1}>
              <QAThreadDialog />
            </Grid>
          </Grid>
          {currentUser === null && (
            <Grid xs={12} item>
              <Box mt={3} />
              <CustomAlert
                severity="info"
                alertTitle="You are not logged in"
                alertText="Please log in to your account on "
                route="/login"
                pageName="Login page"
              />
            </Grid>
          )}
          {currentUser &&
            (currentUser.modules.length === 0 ? (
              <Box mt={3}>
                <CustomAlert
                  severity="info"
                  alertTitle="You don't have any modules"
                  alertText="Please add your modules on "
                  route="/dashboard"
                  pageName="Dashboard page"
                />
              </Box>
            ) : (
              <Box width={1} className={liveThreadsClasses.list}>
                {searchQueries.map((moduleCode) => (
                  <QAThreadModule
                    currentUser={currentUser}
                    moduleCode={moduleCode}
                    key={moduleCode}
                    threads={qaThreadsByModule(moduleCode)}
                  />
                ))}
              </Box>
            ))}
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box my="10px">
              <Typography variant="h6" align="center">
                My threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              {myThreads.map((thread, index) => (
                <YourQAThread key={index} thread={thread} />
              ))}
            </Box>
            <Box my={2}>
              <Typography variant="h6" align="center">
                Starred threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              {starredThreads.map((thread, index) => (
                <YourQAThread key={index} thread={thread} />
              ))}
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  starredThreads: selectMyStarredQAThreads(state),
  myThreads: selectMyQAThreads(state),
  currentUser: selectCurrentUser(state),
  qaThreadsByModule: (moduleCode) => selectQAThreadsByModule(moduleCode)(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyThreads: (userId) => dispatch(readMyQAThreads(userId)),
  readMyStarredThreads: (userId) => dispatch(readMyStarredQAThreads(userId)),
  readThreadsByModule: (moduleCode) =>
    dispatch(readQAThreadsByModule(moduleCode)),
});

export const QAThreadPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QAThreadPageComponent);

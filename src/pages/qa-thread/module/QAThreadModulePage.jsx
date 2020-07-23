import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectMyQAThreads,
  selectQAThreadsByModule,
  selectMyStarredQAThreads,
} from '../../../redux/qaThread/qaThread.selector';
import {
  readMyQAThreads,
  readMyStarredQAThreads,
  readQAThreadsByModule,
} from '../../../redux/qaThread/qaThread.action';

import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// import { ClickAwayListener } from '@material-ui/core';

import { CustomAlert } from '../../../components/shared/CustomAlert';
import { Module } from '../../../models/Module';
import { materialStyles } from '../../../styles/material.styles';
// import { Searchbar } from '../../../components/Searchbar/Searchbar';
import { QAThreadDialog } from '../../../components/QAThreadDialog/QAThreadDialog';
import { YourQAThread } from '../../../components/YourQAThread/YourQAThread';
import { YourQAThreadSmall } from '../../../components/YourQAThreadSmall/YourQAThreadSmall';
import { QAThreadCard } from '../../../components/QAThreadCard/QAThreadCard';

const liveThreadsStyles = makeStyles({
  list: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
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
      width: '6px',
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

const QAThreadModulePageComponent = ({
  myThreads,
  starredThreads,
  currentUser,
  readMyThreads,
  readMyStarredThreads,
  readThreadsByModule,
  qaThreadsByModule,
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const materialClasses = materialStyles();
  const liveThreadsClasses = liveThreadsStyles();
  const yourThreadsClasses = yourThreadsStyles();
  const { moduleCode } = useParams();
  const module = Module.getModuleByModuleCode(moduleCode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [anotherAnchorEl, setAnotherAnchorEl] = React.useState(null);
  const [anotherOpen, setAnotherOpen] = React.useState(false);

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

  useEffect(() => {
    // fetch open threads under the module, my threads and starred threads
    if (currentUser && currentUser.id != null) {
      readMyThreads(currentUser.id);
      readMyStarredThreads(currentUser.id);
      readThreadsByModule(moduleCode);
    }
  }, [
    moduleCode,
    currentUser,
    readThreadsByModule,
    readMyThreads,
    readMyStarredThreads,
  ]);

  const threads = qaThreadsByModule(moduleCode);

  return (
    <Box className={materialClasses.root}>
      <Hidden mdUp>
        <Popper
          open={open}
          style={{ width: '94%' }}
          anchorEl={anchorEl}
          placement="bottom"
        >
          {currentUser && <YourQAThreadSmall myThreads={myThreads} />}
        </Popper>
      </Hidden>
      <Hidden mdUp>
        <Popper
          open={anotherOpen}
          style={{ width: '94%' }}
          anchorEl={anotherAnchorEl}
          placement="bottom"
        >
          {currentUser && <YourQAThreadSmall myThreads={starredThreads} />}
        </Popper>
      </Hidden>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} md={8}>
          <Box mb={!xs ? 2 : 0} mt={xs ? 1 : 0}>
            <Typography variant="h4" align="center">
              {moduleCode}
            </Typography>
          </Box>
          <Hidden mdUp>
            <Box my="4px">
              <Grid container alignItems="center">
                <Grid item xs={10}>
                  <Button
                    onClick={handleClick}
                    disabled={!currentUser}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    <Typography variant="button">My threads</Typography>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <QAThreadDialog
                    modulePage
                    module={{
                      moduleCode: module.moduleCode,
                      title: module.title,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box my="4px">
              <Button
                onClick={handleAnotherClick}
                disabled={!currentUser}
                variant="outlined"
                fullWidth
                size="small"
              >
                <Typography variant="button">Starred threads</Typography>
              </Button>
            </Box>
          </Hidden>
          <Grid container height={1} spacing={1}>
            <Grid item xs={12}>
              {!xs && (
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item md={4}>
                      <QAThreadDialog
                        modulePage
                        module={{
                          moduleCode: module.moduleCode,
                          title: module.title,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} wrap="nowrap">
              <Box width={1} className={liveThreadsClasses.list}>
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
                {currentUser && threads && threads.length === 0 && (
                  <Alert severity="info">
                    No thread detected on this Module. Feel free to initiate the
                    first ever thread to tackle tasks on this Module!
                  </Alert>
                )}
                {currentUser &&
                  threads &&
                  threads.map((thread, index) => (
                    <QAThreadCard key={index} thread={thread} modulePage />
                  ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box my="10px">
              <Typography variant="h6" align="center">
                My threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              {currentUser &&
                myThreads.map((thread, index) => (
                  <YourQAThread key={index} thread={thread} />
                ))}
            </Box>
            <Box my={2}>
              <Typography variant="h6" align="center">
                Starred threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              {currentUser &&
                starredThreads.map((thread, index) => (
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
  myThreads: selectMyQAThreads(state),
  starredThreads: selectMyStarredQAThreads(state),
  qaThreadsByModule: (moduleCode) => selectQAThreadsByModule(moduleCode)(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyThreads: (userId) => dispatch(readMyQAThreads(userId)),
  readMyStarredThreads: (userId) => dispatch(readMyStarredQAThreads(userId)),
  readThreadsByModule: (moduleCode) =>
    dispatch(readQAThreadsByModule(moduleCode)),
});

export const QAThreadModulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QAThreadModulePageComponent);

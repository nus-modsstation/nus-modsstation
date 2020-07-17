import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { QAThread } from '../../../models/QAThread';
import {
  selectMyQAThreads,
  selectQAThreadsByModule,
} from '../../../redux/qaThread/qaThread.selector';
import {
  readMyQAThreads,
  readQAThreadsByModule,
} from '../../../redux/qaThread/qaThread.action';
import { selectCurrentUser } from '../../../redux/user/user.selector';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

import { materialStyles } from '../../../styles/material.styles';
import { Searchbar } from '../../../components/Searchbar/Searchbar';
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

const QAThreadModulePageComponent = ({
  myThreads,
  currentUser,
  readMyThreads,
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

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleAnotherClick = (event) => {
    setAnotherOpen((prev) => !prev);
    setAnotherAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleAnotherClickAway = () => {
    setAnotherOpen(false);
  };

  useEffect(() => {
    // fetch open threads under the module and my threads
    readThreadsByModule('MOD1001');
    if (currentUser && currentUser.id != null) {
      readMyThreads(currentUser.id);
    }
  }, [currentUser, readThreadsByModule, readMyThreads]);

  const threads = qaThreadsByModule('MOD1001');

  return (
    <Box className={materialClasses.root}>
      <Hidden mdUp>
        <Popper open={open} anchorEl={anchorEl} placement="bottom">
          <YourQAThreadSmall />
        </Popper>
      </Hidden>
      <Hidden mdUp>
        <Popper
          open={anotherOpen}
          anchorEl={anotherAnchorEl}
          placement="bottom"
        >
          <YourQAThreadSmall />
        </Popper>
      </Hidden>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" align="center">
            MOD1001
          </Typography>
          <Hidden mdUp>
            <Box my="4px">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  <Typography variant="button">Starred threads</Typography>
                </Button>
              </ClickAwayListener>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box my="4px">
              <ClickAwayListener onClickAway={handleAnotherClickAway}>
                <Button
                  onClick={handleAnotherClick}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  <Typography variant="button">Recent threads</Typography>
                </Button>
              </ClickAwayListener>
            </Box>
          </Hidden>
          <Grid container height={1} spacing={1}>
            <Grid item xs={12}>
              <Searchbar searchOptions={QAThread.searchOptions} />
            </Grid>
            <Grid item xs={12} wrap="nowrap">
              <Box width={1} className={liveThreadsClasses.list}>
                {threads.map((thread, index) => (
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
                Starred threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              <YourQAThread />
            </Box>
            <Box my={2}>
              <Typography variant="h6" align="center">
                Recent threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              <YourQAThread />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  myThreads: selectMyQAThreads(state),
  currentUser: selectCurrentUser(state),
  qaThreadsByModule: (moduleCode) => selectQAThreadsByModule(moduleCode)(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyThreads: (userId) => dispatch(readMyQAThreads(userId)),
  readThreadsByModule: (moduleCode) =>
    dispatch(readQAThreadsByModule(moduleCode)),
});

export const QAThreadModulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QAThreadModulePageComponent);

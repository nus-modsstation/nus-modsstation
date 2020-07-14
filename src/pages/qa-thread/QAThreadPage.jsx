import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { materialStyles } from '../../styles/material.styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { QAThreadModule } from '../../components/QAThreadModule/QAThreadModule';
import { YourQAThread } from '../../components/YourQAThread/YourQAThread';
import { YourQAThreadSmall } from '../../components/YourQAThreadSmall/YourQAThreadSmall';

// temporary imports
import { StudyGroup } from '../../models/StudyGroup';

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

export const QAThreadPage = () => {
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
          <Box>
            <Searchbar
              searchOptions={StudyGroup.searchOptions}
              searchCallback={() => {}}
            />
          </Box>
          <Box width={1} className={liveThreadsClasses.list}>
            <QAThreadModule />
            <QAThreadModule />
            <QAThreadModule />
            <QAThreadModule />
            <QAThreadModule />
          </Box>
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
              <YourQAThread />
              <YourQAThread />
              <YourQAThread />
              <YourQAThread />
            </Box>
            <Box my={2}>
              <Typography variant="h6" align="center">
                Recent threads
              </Typography>
            </Box>
            <Box className={yourThreadsClasses.list}>
              <YourQAThread />
              <YourQAThread />
              <YourQAThread />
              <YourQAThread />
              <YourQAThread />
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

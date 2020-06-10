import React from 'react';

import { Dashboard } from '../../models/Dashboard';

import { materialStyles, theme } from '../../styles/material.styles';
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

export const DashboardPage = () => {
  const materialClasses = materialStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = Dashboard.options;

  return (
    <Box className={materialClasses.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography display="inline" variant="h5">
          Dashboard1
        </Typography>
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
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={materialClasses.paper}>Search bar</Paper>
            <Box height={theme.spacing(2)} />
            <Paper className={materialClasses.paper}>
              Upcoming study groups
            </Paper>
            <Box height={theme.spacing(2)} />
            <Paper className={materialClasses.paper}>Virtual groups</Paper>
            <Box height={theme.spacing(2)} />
            <Paper className={materialClasses.paper}>Q&A Threads</Paper>
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
    </Box>
  );
};

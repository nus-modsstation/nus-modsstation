import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export const TemplatePage = () => {
  const classes = useStyles();
  const materialClasses = materialStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={materialClasses.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        textAlign="left"
        mb={2}
      >
        <Typography display="inline" variant="h5">
          Title (use h5 variant)
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
          <MenuItem onClick={handleClose}>Friends</MenuItem>
          <MenuItem onClick={handleClose}>User guide</MenuItem>
          <MenuItem onClick={handleClose}>Study stats</MenuItem>
          <MenuItem onClick={handleClose}>Collections</MenuItem>
        </Menu>
      </Box>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>Search bar</Paper>
            <Box height={16.0} />
            <Paper className={classes.paper}>
              <Typography variant="h6">
                Section title (use h6 variant)
              </Typography>
              <Typography display="block" variant="body2">
                Root Box use materialClasses.root class (should add as the class
                for every page root Box)
                <ul>
                  <li>textAlign: left</li>
                  <li>padding: theme.spacing(3)</li>
                  <li>marginBottom: 50.0</li>
                </ul>
              </Typography>
              <Typography display="block" variant="body2">
                Content text (use body2 variant)
              </Typography>
            </Paper>
            <Box height={16.0} />
            <Paper className={classes.paper}>
              <Typography variant="h6">
                Section title (use h6 variant)
              </Typography>
              <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. (use body2 variant)
              </Typography>
            </Paper>
            <Box height={16.0} />
            <Paper className={classes.paper}>
              <Typography variant="h6">
                Section title (use h6 variant)
              </Typography>
              <Typography variant="body2">
                asd te Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. (use body2 variant)
              </Typography>
            </Paper>
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6">
                  Side panel title (use h6 variant)
                </Typography>
                <Typography variant="body1">
                  Option (use body1 variant)
                </Typography>
                <Typography variant="body1">
                  Option (use body1 variant)
                </Typography>
                <Typography variant="body1">
                  Option (use body1 variant)
                </Typography>
                <Typography variant="body1">
                  Option (use body1 variant)
                </Typography>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Box>
  );
};

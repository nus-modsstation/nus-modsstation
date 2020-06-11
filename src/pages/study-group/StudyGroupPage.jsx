import React from 'react';
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
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const StudyGroupPage = () => {
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
          Study Group
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
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={sampleOptions.sort((a, b) =>
                b.type.localeCompare(a.type)
              )}
              groupBy={(option) => option.type}
              getOptionLabel={(option) => option.option}
              filterSelectedOptions
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color={option.color}
                    variant="outlined"
                    key={index}
                    label={option.option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Search module, location"
                  placeholder="CS2030S, COM1"
                />
              )}
            />
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Paper className={materialClasses.paper}>
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
      </Box>
    </Box>
  );
};

const sampleOptions = [
  { type: 'location', option: 'AS1', color: 'secondary' },
  { type: 'location', option: 'Central Library', color: 'secondary' },
  { type: 'location', option: 'COM1', color: 'secondary' },
  { type: 'location', option: 'COM2', color: 'secondary' },
  { type: 'location', option: 'HSSML', color: 'secondary' },
  { type: 'location', option: 'I3', color: 'secondary' },
  { type: 'module', option: 'CS2030S', color: 'primary' },
  { type: 'module', option: 'CS2040S', color: 'primary' },
  { type: 'module', option: 'CS2100', color: 'primary' },
  { type: 'module', option: 'CS2101', color: 'primary' },
  { type: 'module', option: 'CS2102', color: 'primary' },
  { type: 'module', option: 'CS2103', color: 'primary' },
];

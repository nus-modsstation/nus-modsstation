import React from 'react';

import { Module } from '../../models/Module';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export const Searchbar = ({ currentUser, searchCallback }) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.up('xs'));
  const options = currentUser.modules
    .filter((moduleCode) => moduleCode !== 'MOD1001')
    .map((moduleCode) => Module.getModuleByModuleCode(moduleCode));
  const handleSelect = (_, value, reason) => {
    // modules or locations are selected
    // pass back the search data
    // to perform search on Firestore
    const searchData = {
      reason: reason,
      value: value,
    };
    searchCallback(searchData);
  };

  return (
    <Box>
      <Autocomplete
        id="tags-standard"
        size={matchXs ? 'small' : 'medium'}
        options={options}
        getOptionLabel={(option) => option.moduleCode}
        getOptionSelected={(option) => option.moduleCode}
        onChange={handleSelect}
        filterSelectedOptions
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color="primary"
              variant="outlined"
              key={index}
              label={option.moduleCode}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Search module" />
        )}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <ImportContactsIcon color="primary" className={classes.icon} />
              </Grid>
              <Grid item xs>
                <Typography>{option.moduleCode}</Typography>

                <Typography variant="body2" color="textSecondary">
                  {option.title}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </Box>
  );
};

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { modules, Module } from '../../models/Module';
import {
  updateUserStart,
  clearUpdateSuccess,
  clearUpdateError,
} from '../../redux/user/user.action';
import {
  selectUpdateSuccess,
  selectUpdateError,
} from '../../redux/user/user.selector';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ErrorMessage } from '../shared/ErrorMessage';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0), // Fix IE 11 issue.
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const AddModuleFormComponent = ({
  updateSuccess,
  updateError,
  clearUpdateSuccess,
  clearUpdateError,
  currentUser,
  updateUserStart,
}) => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [userModules, setUserModules] = useState([
    ...currentUser.modules
      .filter((moduleCode) => moduleCode !== 'MOD1001')
      .map((moduleCode) => Module.getModuleByModuleCode(moduleCode)),
  ]);

  const onSubmit = async (event) => {
    event.preventDefault();
    // extract module code
    const moduleCodes = {
      modules: userModules.map((module) => module.moduleCode),
    };
    const userData = {
      id: currentUser.id,
      data: moduleCodes,
    };
    updateUserStart(userData);
  };

  const handleSelect = (event, value, reason) => {
    setUserModules(value);
  };

  const inputChange = (_, value, reason) => {
    // populate options based on the input
    let count = 0;
    value = value.toUpperCase();
    const filteredOptions = modules.filter(
      (module) => module.moduleCode.startsWith(value) && count++ < 5
    );
    setOptions(filteredOptions);
  };

  useEffect(
    () => () => {
      if (updateSuccess) {
        clearUpdateSuccess();
      }
      if (updateError) {
        clearUpdateError();
      }
    },
    [updateSuccess, clearUpdateSuccess, updateError, clearUpdateError]
  );

  return (
    <Box mt={2}>
      <form onSubmit={onSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <Autocomplete
              multiple
              filterSelectedOptions
              className={classes.form}
              options={[...userModules, ...options]}
              value={userModules}
              onInputChange={inputChange}
              onChange={handleSelect}
              getOptionLabel={(option) => option.moduleCode}
              getOptionSelected={(option, value) => {
                return option.moduleCode === value.moduleCode;
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={option.moduleCode}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Modules"
                  className={classes.form}
                  variant="outlined"
                  fullWidth
                  required
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'disabled', // disable autocomplete and autofill
                  }}
                />
              )}
              renderOption={(option) => {
                return (
                  <Grid container alignItems="center">
                    <Grid item>
                      <ImportContactsIcon
                        color="primary"
                        className={classes.icon}
                      />
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
          </Grid>
          <Grid xs={12} item>
            <Box>
              {updateError && (
                <ErrorMessage
                  errorMessage={updateError.message ?? updateError.name}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" color="primary" variant="contained">
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  updateSuccess: selectUpdateSuccess,
  updateError: selectUpdateError,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserStart: (userData) => dispatch(updateUserStart(userData)),
  clearUpdateSuccess: () => dispatch(clearUpdateSuccess()),
  clearUpdateError: () => dispatch(clearUpdateError()),
});

export const AddModuleForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModuleFormComponent);

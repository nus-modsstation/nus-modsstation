import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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
  const { handleSubmit, errors, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      modules: currentUser.modules.map((moduleCode) =>
        Module.getModuleByModuleCode(moduleCode)
      ),
    },
  });
  const [options, setOptions] = useState([]);

  const onSubmit = async (data) => {
    // extract module code
    const moduleCodes = {
      modules: data.modules.map((module) => module.moduleCode),
    };
    const userData = {
      id: currentUser.id,
      data: moduleCodes,
    };
    updateUserStart(userData);
  };

  const inputChange = (_, value, reason) => {
    // populate options based on the input
    let count = 0;
    value = value.toUpperCase();
    console.log('value:', value);
    const filteredOptions = modules.filter(
      (module) => module.moduleCode.startsWith(value) && count++ < 5
    );
    setOptions(filteredOptions);
    console.log('options:', options);
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <Controller
              as={
                <Autocomplete
                  multiple
                  filterSelectedOptions
                  className={classes.form}
                  options={options}
                  onInputChange={inputChange}
                  getOptionLabel={(option) => option.moduleCode}
                  getOptionSelected={(option) => option.moduleCode}
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
                      error={!!errors.modules}
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
              }
              onChange={([, data]) => data}
              name="modules"
              control={control}
              rules={{
                required: 'Module is required',
              }}
            />
            {errors.modules && (
              <ErrorMessage errorMessage={errors.modules.message} />
            )}
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
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!!errors.modules}
              >
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

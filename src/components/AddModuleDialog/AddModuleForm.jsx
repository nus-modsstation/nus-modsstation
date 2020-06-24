import React, { useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0), // Fix IE 11 issue.
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
        Module.getModuleById(moduleCode)
      ),
    },
  });

  const onSubmit = async (data) => {
    // extract module code
    const moduleCodes = {
      modules: data.modules.map((module) => module.id),
    };
    const userData = {
      id: currentUser.id,
      data: moduleCodes,
    };
    updateUserStart(userData);
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
                  options={modules}
                  getOptionLabel={(option) => option.id}
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
                />
              }
              onChange={([, data]) => data}
              name="modules"
              control={control}
              rules={{
                required: 'Module is required',
                validate: (value) =>
                  value.length > 0 || 'Select at least one module',
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

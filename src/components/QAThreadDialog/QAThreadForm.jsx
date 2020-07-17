import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';

import { QAThread } from '../../models/QAThread';
import { modules } from '../../models/Module';
import {
  createQAThreadStart,
  clearOnCreateSuccess,
  clearQAThreadError,
} from '../../redux/qaThread/qaThread.action';
import {
  selectQAThreadError,
  selectCreateSuccess,
} from '../../redux/qaThread/qaThread.selector';

import { ErrorMessage } from '../shared/ErrorMessage';

import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const componentStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0), // Fix IE 11 issue.
  },
}));

const QAThreadFormComponent = ({
  currentUser,
  createThreadStart,
  threadError,
  clearThreadError,
  clearCreateSuccess,
  createSuccess,
  modulePage,
  module,
}) => {
  const componentClasses = componentStyles();

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    // convert to json format to save in database
    let qaThread = QAThread.toJson({
      data: data,
      creatorId: currentUser.id,
    });
    await createThreadStart(qaThread);
  };

  useEffect(
    () => () => {
      if (threadError) {
        clearThreadError();
      }
      console.log('createSuccess from form: ', createSuccess);
      if (createSuccess) {
        clearCreateSuccess();
      }
    },
    [threadError, clearThreadError, createSuccess, clearCreateSuccess]
  );

  const userModules = modules.filter((module) =>
    currentUser.modules.includes(module.id)
  );

  return (
    <Box ml="2px">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Controller
              as={
                <Autocomplete
                  className={componentClasses.form}
                  options={userModules}
                  getOptionLabel={(option) => option.id}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>
                        {option.id}: {option.name}
                      </span>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Module"
                      className={componentClasses.form}
                      variant="outlined"
                      fullWidth
                      required
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disabled', // disable autocomplete and autofill
                      }}
                      error={!!errors.module}
                    />
                  )}
                />
              }
              onChange={([, data]) => data}
              name="module"
              defaultValue={modulePage ? module : undefined}
              control={control}
              rules={{ required: 'Please select module' }}
            />
            {errors.module && (
              <ErrorMessage errorMessage={errors.module.message} />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={componentClasses.form}
              variant="outlined"
              margin="normal"
              name="taskName"
              label="Task Name"
              id="taskName"
              autoFocus
              required
              fullWidth
              autoComplete="off"
              error={!!errors.taskName}
              inputRef={register({
                required: 'Please include the name of the task',
              })}
            />
            {errors.taskName && (
              <ErrorMessage errorMessage={errors.taskName.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <Box>
              {threadError && (
                <ErrorMessage errorMessage={threadError.message} />
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={!!errors.moduleCode || !!errors.taskName}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  threadError: selectQAThreadError,
  createSuccess: selectCreateSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  createThreadStart: (qaThread) => dispatch(createQAThreadStart(qaThread)),
  clearThreadError: () => dispatch(clearQAThreadError()),
  clearCreateSuccess: () => dispatch(clearOnCreateSuccess()),
});

export const QAThreadForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(QAThreadFormComponent);

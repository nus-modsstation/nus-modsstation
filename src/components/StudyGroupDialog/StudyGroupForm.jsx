import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';

import { StudyGroup } from '../../models/StudyGroup';
import { Module } from '../../models/Module';
import {
  createGroupStart,
  clearGroupError,
  clearCreateSuccess,
} from '../../redux/studyGroup/studyGroup.action';
import {
  selectGroupError,
  selectCreateSuccess,
} from '../../redux/studyGroup/studyGroup.selector';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import { dateTimeFormat } from '../../utils/formatDate';
import { Button } from '@material-ui/core';
import { ErrorMessage } from '../shared/ErrorMessage';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
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

const StudyGroupFormComponent = ({
  createGroupStart,
  groupError,
  clearGroupError,
  currentUser,
  createSuccess,
  clearCreateSuccess,
}) => {
  const classes = useStyles();
  const [capacity, setCapacity] = useState(4);
  const now = moment();
  const maxDate = moment().add(5, 'days');
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    setError,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      module: null,
      capacity: 4,
      startTime: moment(),
      endTime: moment().add(1, 'hours'),
    },
  });

  const modules = currentUser.modules.map((moduleCode) =>
    Module.getModuleByModuleCode(moduleCode)
  );

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
    setValue('capacity', event.target.value);
  };

  const watchStart = watch('startTime');
  const watchEnd = watch('endTime');

  const handleStartTimeChange = (event) => {
    const startTime = event[0];
    if (startTime.endOf('minute').isBefore(now)) {
      setError('startTime', 'beforeNow', 'Start time is already passed');
    } else if (
      startTime.isAfter(watchEnd) ||
      startTime.endOf('minute').isSame(watchEnd.endOf('minute'))
    ) {
      setError('startTime', 'startAfterEnd', 'Start time must before end time');
    }
    return startTime;
  };

  const handleEndTimeChange = (event) => {
    const endTime = event[0];
    if (endTime.endOf('minute').isBefore(now)) {
      setError('endTime', 'beforeNow', 'End time is already passed');
    } else if (
      endTime.isBefore(watchStart) ||
      watchStart.endOf('minute').isSame(endTime.endOf('minute'))
    ) {
      setError('endTime', 'endBeforeStart', 'End time must after start time');
    }
    return endTime;
  };

  const onSubmit = async (data) => {
    // convert to json format to save in database
    let studyGroup = StudyGroup.toJson({
      data: data,
      currentUserId: currentUser.id,
    });
    await createGroupStart(studyGroup);
  };

  useEffect(() => {
    register({ name: 'capacity' }); // custom register react select
  }, [register]);

  useEffect(
    () => () => {
      if (groupError) {
        clearGroupError();
      }
      if (createSuccess) {
        clearCreateSuccess();
      }
    },
    [groupError, clearGroupError, createSuccess, clearCreateSuccess]
  );

  return (
    <Box mt={2}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="title"
              label="Group Title"
              id="title"
              autoFocus
              required
              fullWidth
              autoComplete="off"
              error={!!errors.title}
              inputRef={register({ required: 'Group title is required' })}
            />
            {errors.title && (
              <ErrorMessage errorMessage={errors.title.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="description"
              label="Group Description"
              id="description"
              autoComplete="off"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="location"
              label="Location"
              id="location"
              fullWidth
              required
              autoComplete="off"
              error={!!errors.location}
              inputRef={register({ required: 'Meetup location is required' })}
            />
            {errors.location && (
              <ErrorMessage errorMessage={errors.location.message} />
            )}
          </Grid>
          <Grid xs={6} item>
            <Controller
              as={
                <Autocomplete
                  className={classes.form}
                  options={modules}
                  getOptionLabel={(option) => option.moduleCode}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>
                        {option.moduleCode}: {option.title}
                      </span>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Module"
                      className={classes.form}
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
              control={control}
              rules={{ required: 'Module is required' }}
            />
            {errors.module && (
              <ErrorMessage errorMessage={errors.module.message} />
            )}
          </Grid>
          <Grid xs={6} item>
            <FormControl
              error={!!errors.capacity}
              variant="outlined"
              className={classes.form}
            >
              <InputLabel id="capcacity-label">Capacity</InputLabel>
              <Select
                labelId="capacity"
                id="capacity"
                name="capacity"
                value={capacity}
                onChange={handleCapacityChange}
                label="Capacity"
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            {errors.capacity && (
              <ErrorMessage errorMessage={errors.capacity.message} />
            )}
          </Grid>
          <Grid xs={12} sm={6} item>
            <Controller
              name="startTime"
              control={control}
              onChange={handleStartTimeChange}
              as={
                <DateTimePicker
                  autoOk
                  format={dateTimeFormat}
                  className={classes.form}
                  onChange={() => {}}
                  label="From"
                  inputVariant="outlined"
                  disablePast
                  maxDate={maxDate}
                  required
                />
              }
            />
            {errors.startTime && (
              <ErrorMessage errorMessage={errors.startTime.message} />
            )}
          </Grid>
          <Grid xs={12} sm={6} item>
            <Controller
              name="endTime"
              control={control}
              onChange={handleEndTimeChange}
              as={
                <DateTimePicker
                  autoOk
                  format={dateTimeFormat}
                  className={classes.form}
                  onChange={() => {}}
                  label="Until"
                  inputVariant="outlined"
                  disablePast
                  maxDate={maxDate}
                  required
                />
              }
            />
            {errors.endTime && (
              <ErrorMessage errorMessage={errors.endTime.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <Box>
              {groupError && <ErrorMessage errorMessage={groupError.message} />}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !!errors.title ||
                  !!errors.location ||
                  !!errors.module ||
                  !!errors.capacity ||
                  !!errors.startTime ||
                  !!errors.endTime
                }
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
  groupError: selectGroupError,
  createSuccess: selectCreateSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  createGroupStart: (studyGroup) => dispatch(createGroupStart(studyGroup)),
  clearGroupError: () => dispatch(clearGroupError()),
  clearCreateSuccess: () => dispatch(clearCreateSuccess()),
});

export const StudyGroupForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupFormComponent);

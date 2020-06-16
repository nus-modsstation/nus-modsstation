import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';

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

export const StudyGroupForm = () => {
  const classes = useStyles();
  const [startTime, handleStartTimeChange] = useState(new moment());
  const [endTime, handleEndTimeChange] = useState(new moment().add(1, 'hours'));
  const [capacity, setCapacity] = React.useState(4);
  const maxDate = moment().add(5, 'days');
  const { register, handleSubmit, errors, control, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      capacity: 4,
    },
  });

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
    setValue('capacity', event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register({ name: 'capacity' }); // custom register react-select
  }, [register]);

  return (
    <Box mt={2}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="groupTitle"
              label="Group Title"
              id="groupTitle"
              autoFocus
              required
              fullWidth
              error={!!errors.groupTitle}
              inputRef={register({ required: 'Group title is required' })}
            />
            {errors.groupTitle && (
              <ErrorMessage errorMessage={errors.groupTitle.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="groupDescription"
              label="Group Description"
              id="groupDescription"
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
              error={!!errors.location}
              inputRef={register({ required: 'Meetup location is required' })}
            />
            {errors.location && (
              <ErrorMessage errorMessage={errors.location.message} />
            )}
          </Grid>
          <Grid xs={6} item>
            <TextField
              className={classes.form}
              variant="outlined"
              margin="normal"
              name="module"
              label="Module"
              id="module"
              fullWidth
              required
              error={!!errors.module}
              inputRef={register({ required: 'Module is required' })}
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
            <DateTimePicker
              format={dateTimeFormat}
              className={classes.form}
              label="From"
              inputVariant="outlined"
              value={startTime}
              onChange={handleStartTimeChange}
              disablePast
              required
              name="startTime"
              error={!!errors.startTime}
              inputRef={register({ required: 'Start time is required' })}
            />
            {errors.startTime && (
              <ErrorMessage errorMessage={errors.startTime.message} />
            )}
          </Grid>
          <Grid xs={12} sm={6} item>
            <DateTimePicker
              format={dateTimeFormat}
              className={classes.form}
              label="Until"
              inputVariant="outlined"
              value={endTime}
              onChange={handleEndTimeChange}
              maxDate={maxDate}
              required
              name="endTime"
              error={!!errors.endTime}
              inputRef={register({ required: 'End time is required' })}
            />
            {errors.endTime && (
              <ErrorMessage errorMessage={errors.endTime.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !!errors.groupTitle ||
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
      <DevTool control={control} />
    </Box>
  );
};

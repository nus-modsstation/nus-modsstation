import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';

import { VirtualGroup } from '../../models/VirtualGroup';
import { Module } from '../../models/Module';
import {
  createVirtualGroupStart,
  clearOnCreateSuccess,
  clearVirtualGroupError,
} from '../../redux/virtualGroup/virtualGroup.action';
import {
  selectVirtualGroupError,
  selectCreateSuccess,
} from '../../redux/virtualGroup/virtualGroup.selector';

import { ErrorMessage } from '../shared/ErrorMessage';

import { TextField } from '@material-ui/core';
import { FormControl, FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
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

// sample data
const sampleFriends = [
  { username: 'Hello world' },
  { username: 'Anonymous Mouse' },
  { username: 'JM' },
];

const VirtualGroupFormComponent = ({
  currentUser,
  createGroupStart,
  groupError,
  clearGroupError,
  clearCreateSuccess,
  createSuccess,
  modulePage,
  module,
}) => {
  const componentClasses = componentStyles();
  const [isPrivate, setPrivate] = React.useState(false);
  const modules = currentUser.modules.map((moduleCode) =>
    Module.getModuleByModuleCode(moduleCode)
  );

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleChange = () => {
    setPrivate(!isPrivate);
  };

  const onSubmit = async (data) => {
    // convert to json format to save in database
    let virtualGroup = VirtualGroup.toJson({
      data: data,
      creatorId: currentUser.id,
      isPublic: !isPrivate,
    });
    console.log(virtualGroup);
    await createGroupStart(virtualGroup);
  };

  useEffect(
    () => () => {
      if (groupError) {
        clearGroupError();
      }
      console.log('createSuccess from form: ', createSuccess);
      if (createSuccess) {
        clearCreateSuccess();
      }
    },
    [groupError, clearGroupError, createSuccess, clearCreateSuccess]
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={8} md={5}>
            <Controller
              as={
                <Autocomplete
                  className={componentClasses.form}
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
              name="groupName"
              label="Group Name"
              id="groupName"
              autoFocus
              required
              fullWidth
              autoComplete="off"
              error={!!errors.groupName}
              inputRef={register({ required: 'Please give your group a name' })}
            />
            {errors.groupName && (
              <ErrorMessage errorMessage={errors.groupName.message} />
            )}
          </Grid>
          <Grid xs={12} item>
            <TextField
              className={componentClasses.form}
              variant="outlined"
              margin="normal"
              name="description"
              label="Group Description"
              id="description"
              autoComplete="off"
              inputRef={register}
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid xs={12} item>
            <Autocomplete
              multiple
              id="addFriends"
              options={sampleFriends}
              getOptionLabel={(friend) => friend.username}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add friends"
                  variant="outlined"
                  margin="normal"
                  autoFocus
                />
              )}
            />
          </Grid>
          <Grid xs={8} md={6} item>
            <FormControl className={componentClasses.form}>
              <FormControlLabel
                control={<Checkbox id="isPublic" onChange={handleChange} />}
                label="Set group as private"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <Box>
              {groupError && <ErrorMessage errorMessage={groupError.message} />}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={!!errors.moduleCode || !!errors.groupName}
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
  groupError: selectVirtualGroupError,
  createSuccess: selectCreateSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  createGroupStart: (virtualGroup) =>
    dispatch(createVirtualGroupStart(virtualGroup)),
  clearGroupError: () => dispatch(clearVirtualGroupError()),
  clearCreateSuccess: () => dispatch(clearOnCreateSuccess()),
});

export const VirtualGroupForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupFormComponent);

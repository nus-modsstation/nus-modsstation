import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "react-hook-form-devtools";

import { TextField } from "@material-ui/core";
import { FormControl, FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { ErrorMessage } from "../shared/ErrorMessage";

const componentStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0), // Fix IE 11 issue.
  },
}));

// sample data
const sampleModules = [
  { id: "MOD1001", name: "Test Module" },
  { id: "CS2030", name: "Programming Methodology II" },
  { id: "CS2040S", name: "Data Structures and Algorithms" },
  { id: "CS2100", name: "Computer Organisation" },
  { id: "CS2106", name: "Introduction to Operating Systems" },
];
const sampleFriends = [
  { username: "Hello world" },
  { username: "Anonymous Mouse" },
  { username: "JM" },
];

export const VirtualGroupForm = ({ modulePage, module }) => {
  const componentClasses = componentStyles();

  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={8} md={5}>
            <Controller
              as={
                <Autocomplete
                  className={componentClasses.form}
                  options={sampleModules}
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
                        autoComplete: "disabled", // disable autocomplete and autofill
                      }}
                      error={!!errors.module}
                    />
                  )}
                />
              }
              onChange={([, data]) => data}
              name="module"
              control={control}
              defaultValue={modulePage ? module : undefined}
              rules={{ required: "Please select module" }}
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
              error={!!errors.groupName}
              inputRef={register({ required: "Please give your group a name" })}
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
              name="groupDescription"
              label="Group Description"
              id="groupDescription"
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
                control={<Checkbox />}
                label="Set group as private"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item>
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
      <DevTool control={control} />
    </Box>
  );
};

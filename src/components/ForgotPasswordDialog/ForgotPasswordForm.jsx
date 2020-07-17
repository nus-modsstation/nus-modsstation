import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { sendResetPasswordEmail } from '../../services/userAuth';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { ErrorMessage } from '../shared/ErrorMessage';
import Alert from '@material-ui/lab/Alert';
import DialogContentText from '@material-ui/core/DialogContentText';

export const ForgotPasswordForm = () => {
  const { triggerValidation, errors, register, reset, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [resetError, setResetError] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const onSubmitEmail = async () => {
    try {
      const result = await triggerValidation('email');
      if (result) {
        const email = getValues('email');
        await sendResetPasswordEmail(email);
        reset();
        setResetSuccess(true);
        setResetError(false);
      }
    } catch (error) {
      setResetSuccess(false);
      setResetError(error);
    }
  };

  return (
    <Box>
      <form key={2} noValidate>
        <Grid container spacing={2}>
          {resetSuccess && (
            <Box width={1} mb={1}>
              <Alert severity="success">
                Password reset email is sent successfully.
              </Alert>
            </Box>
          )}
          <Grid xs={12} item>
            <DialogContentText>
              Please enter your email address to reset password
            </DialogContentText>
          </Grid>
          <Grid xs={12} item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              inputRef={register({
                required: 'Email is required',
              })}
            />
            {errors.email && (
              <ErrorMessage errorMessage={errors.email.message} />
            )}
            {resetError && <ErrorMessage errorMessage={resetError.message} />}
          </Grid>
          <Grid xs={12} item>
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={onSubmitEmail}
                color="primary"
                variant="contained"
                disabled={!!errors.modules}
              >
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

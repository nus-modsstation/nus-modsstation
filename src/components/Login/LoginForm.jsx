import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';

import { registerUser, login } from '../../services/userAuth';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ErrorMessage } from '../shared/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  errorText: {
    align: 'left',
    color: 'error',
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const onSubmit = async (data) => {
    if (isLogin) {
      await login(data);
    } else {
      await registerUser(data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <DevTool control={control} />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus={!isLogin}
              error={!!errors.username}
              inputRef={register({ required: 'Username is required' })}
            />
          )}
          {!isLogin && errors.username && (
            <ErrorMessage errorMessage={errors.username.message} />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            error={!!errors.email}
            inputRef={register({
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@(nus.edu.sg|comp.nus.edu.sg|u.nus.edu)$/,
                message: 'Use NUS email only',
              },
            })}
          />
          {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            inputRef={register({
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z_@./#&+-]{8,}$/,
                message: 'Use 8 or more characters with letters and numbers',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!errors.username || !!errors.email || !!errors.password}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Grid container justify="space-between">
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={isLogin ? '/register' : '/login'} variant="body2">
                {isLogin
                  ? "Don't have an account? Register"
                  : 'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

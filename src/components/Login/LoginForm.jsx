import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createStructuredSelector } from 'reselect';

import { selectAuthError } from '../../redux/user/user.selector';
import {
  loginStart,
  registerStart,
  clearAuthError,
} from '../../redux/user/user.action';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ErrorMessage } from '../shared/ErrorMessage';
import { ForgotPasswordDialog } from '../ForgotPasswordDialog/ForgotPasswordDialog';
import Backdrop from '@material-ui/core/Backdrop';
import PacmanLoader from 'react-spinners/PacmanLoader';

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const LoginFormComponent = ({
  loginStart,
  registerStart,
  authError,
  clearAuthError,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const validateRule = ({ requiredMessage, pattern }) => {
    const rule = {
      required: requiredMessage,
    };
    if (pattern !== undefined) {
      rule.pattern = pattern;
    }
    return rule;
  };

  const onSubmit = async (data) => {
    setOpen(true);
    if (isLogin) {
      await loginStart(data);
    } else {
      await registerStart(data);
    }
  };

  useEffect(() => {
    clearAuthError();
    reset();
  }, [location, clearAuthError, reset]);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  useEffect(() => {
    if (authError) {
      setOpen(false);
    }
  }, [authError]);

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <PacmanLoader color="#36D7B7" />
      </Backdrop>
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form
          key={1}
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
              autoComplete="off"
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
            inputRef={
              isLogin
                ? register(
                    validateRule({ requiredMessage: 'Email is required' })
                  )
                : register(
                    validateRule({
                      requiredMessage: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@(nus.edu.sg|comp.nus.edu.sg|u.nus.edu)$/,
                        message: 'Use NUS email only',
                      },
                    })
                  )
            }
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
            inputRef={
              isLogin
                ? register(
                    validateRule({ requiredMessage: 'Password is required' })
                  )
                : register(
                    validateRule({
                      requiredMessage: 'Password is required',
                      pattern: {
                        value: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z_@./#&+-]{8,}$/,
                        message:
                          'Use 8 or more characters with letters and numbers',
                      },
                    })
                  )
            }
          />
          {errors.password && (
            <ErrorMessage errorMessage={errors.password.message} />
          )}
          {authError && <ErrorMessage errorMessage={authError.message} />}
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
          <Grid container>
            <Grid item xs>
              <ForgotPasswordDialog />
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

const mapStateToProps = createStructuredSelector({
  authError: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (userCredentials) => dispatch(loginStart(userCredentials)),
  registerStart: (userCredentials) => dispatch(registerStart(userCredentials)),
  clearAuthError: () => dispatch(clearAuthError()),
});

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

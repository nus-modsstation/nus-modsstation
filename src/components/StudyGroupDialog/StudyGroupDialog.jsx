import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCreateSuccess } from '../../redux/studyGroup/studyGroup.selector.js';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { StudyGroupForm } from './StudyGroupForm';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { CustomSnackbar } from '../../components/shared/CustomSnackbar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const useStyles = makeStyles((theme) => ({
  dialogTitleText: {
    display: 'inline',
    padding: 0,
  },
  dialogTitleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: 'center',
  },
}));

const StudyGroupDialogComponent = ({ currentUser, createSuccess }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (createSuccess) {
      // close the dialog after study group is created successfully
      // show success CustomSnackbar
      setOpenSnackbar(true);
      setOpen(false);
    }
  }, [createSuccess]);

  return (
    <div>
      {smallScreen ? (
        <IconButton disabled={!currentUser} onClick={handleClickOpen}>
          <AddCircleRoundedIcon style={{ fontSize: 44 }} />
        </IconButton>
      ) : (
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={handleClickOpen}
          disabled={!currentUser}
        >
          Create
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={classes.dialogTitleSection}>
          <DialogTitle
            className={classes.dialogTitleText}
            id="form-dialog-title"
          >
            Create Study Group
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {/* Add this after setting up email verification && currentUser.isVerified */}
          {currentUser ? (
            <div style={{ height: '100%', overflow: 'hidden' }}>
              <DialogContentText>
                In light of the phase two of re-opening, the group capacity will
                be limited to&nbsp;
                <u>
                  <strong>5</strong>
                </u>
                &nbsp;people.
              </DialogContentText>
              <StudyGroupForm currentUser={currentUser} />
            </div>
          ) : (
            <DialogContentText>
              {currentUser
                ? 'Please verify your email.'
                : 'Please log in to your account.'}
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
      {openSnackbar && (
        <CustomSnackbar
          variant="success"
          message="The study group is created successfully"
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  createSuccess: selectCreateSuccess,
});

export const StudyGroupDialog = connect(mapStateToProps)(
  StudyGroupDialogComponent
);

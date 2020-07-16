import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCreateSuccess } from '../../redux/qaThread/qaThread.selector';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { CustomSnackbar } from '../../components/shared/CustomSnackbar';

import { QAThreadForm } from '../../components/QAThreadDialog/QAThreadForm';

const componentStyles = makeStyles((theme) => ({
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

const QAThreadDialogComponent = ({
  currentUser,
  createSuccess,
  modulePage,
  module,
}) => {
  const theme = useTheme();
  const componentClasses = componentStyles();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const screenSmall = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (createSuccess) {
      // close the dialog after thread is created successfully
      // show success CustomSnackbar
      setOpenSnackbar(true);
      setOpen(false);
    }
  }, [createSuccess]);

  return (
    <div>
      {screenSmall ? (
        <IconButton onClick={handleClickOpen} disabled={!currentUser}>
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
        pb="10px"
        open={open}
        onClose={handleClose}
        fullScreen={screenSmall}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={componentClasses.dialogTitleSection}>
          <DialogTitle
            className={componentClasses.dialogTitleText}
            id="form-dialog-title"
          >
            Create QA Thread
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {currentUser ? (
            <div style={{ overflow: 'hidden', height: '100%', width: '100%' }}>
              <div
                style={{
                  margin: 10,
                  height: '100%',
                  width: '100%',
                  boxSizing: 'content-box',
                }}
              >
                <QAThreadForm
                  currentUser={currentUser}
                  modulePage={modulePage}
                  module={module}
                />
              </div>
            </div>
          ) : (
            <DialogContentText>
              Please log in to your account or register.
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
      {openSnackbar && (
        <CustomSnackbar
          variant="success"
          message="The QA thread has been created successfully"
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  createSuccess: selectCreateSuccess,
});

export const QAThreadDialog = connect(mapStateToProps)(QAThreadDialogComponent);

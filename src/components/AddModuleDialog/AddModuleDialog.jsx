import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectUpdateSuccess,
} from '../../redux/user/user.selector';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddModuleForm } from './AddModuleForm';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { CustomSnackbar } from '../shared/CustomSnackbar';

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

const AddModuleDialogComponent = ({ currentUser, updateSuccess }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (updateSuccess) {
      // close the dialog after user's modules are updated successfully
      // show success CustomSnackbar
      setOpenSnackbar(true);
      setOpen(false);
    }
  }, [updateSuccess]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        fullWidth
      >
        <Box className={classes.dialogTitleSection}>
          <DialogTitle
            className={classes.dialogTitleText}
            id="form-dialog-title"
          >
            Add modules
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {/* Add "&& currentUser.isVerified" below after setting up email verification  */}
          {currentUser ? (
            <div style={{ height: '100%', overflow: 'hidden' }}>
              <AddModuleForm currentUser={currentUser} />
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
          message="My modules are updated successfully"
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  updateSuccess: selectUpdateSuccess,
});

export const AddModuleDialog = connect(mapStateToProps)(
  AddModuleDialogComponent
);

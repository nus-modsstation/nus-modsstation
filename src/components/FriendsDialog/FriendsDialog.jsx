import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { materialStyles } from '../../styles/material.styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export const FriendsDialog = ({ currentUser, openDialog, closeCallback }) => {
  const materialClasses = materialStyles();
  const [open, setOpen] = useState(openDialog);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        fullScreen={fullScreen}
        fullWidth
      >
        <Box className={materialClasses.dialogTitleSection}>
          <DialogTitle
            className={materialClasses.dialogTitleText}
            id="form-dialog-title"
          >
            Friends
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {/* Add "&& currentUser.isVerified" below after setting up email verification  */}
          {currentUser ? (
            <div style={{ height: '100%', overflow: 'hidden' }}>
              Friends list
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
    </div>
  );
};

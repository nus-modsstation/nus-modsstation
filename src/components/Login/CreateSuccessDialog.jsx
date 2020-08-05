import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CreateSuccessDialog = ({ openDialog, email }) => {
  const [open, setOpen] = useState(openDialog);
  const [userEmail, setUserEmail] = useState(email);

  const handleClose = () => {
    setOpen(false);
    setUserEmail('');
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  useEffect(() => {
    setUserEmail(email);
  }, [email]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register account successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`A verification email has been sent to ${userEmail}. Please verify your
            email before login.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

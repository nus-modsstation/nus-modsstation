import React from 'react';
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

export const StudyGroupDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
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
          <DialogContentText>
            In light of the phase two of re-opening, the group capacity will be
            limited to&nbsp;
            <u>
              <strong>5</strong>
            </u>
            &nbsp;people.
          </DialogContentText>
          <StudyGroupForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

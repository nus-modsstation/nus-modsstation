import React, { useEffect } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { materialStyles } from '../../styles/material.styles';
import { makeStyles } from '@material-ui/core/styles';

const componentStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0), // Fix IE 11 issue.
  },
}));

export const AddFriendsDialog = ({
  friendsData,
  groupData,
  openDialog,
  closeCallback,
  addFriends,
}) => {
  const materialClasses = materialStyles();
  const componentClasses = componentStyles();

  const [open, setOpen] = React.useState(openDialog);
  const [options, setOptions] = React.useState(
    friendsData.filter((user) => !groupData.users.includes(user.id))
  );
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const theme = useTheme();
  const fullWidth = useMediaQuery(theme.breakpoints.down('xs'));

  const addFriendsAndClose = (friends) => {
    addFriends(friends);
    setOpen(false);
    closeCallback();
  };

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    addFriendsAndClose(selectedFriends);
  };

  const handleSelect = (event, value, reason) => {
    setSelectedFriends(value);
  };

  const inputChange = (_, value, reason) => {
    // populate options based on the input
    let count = 0;
    // value = value.toUpperCase();
    const filteredOptions = friendsData.filter(
      (user) =>
        user.username.startsWith(value) &&
        count++ < 5 &&
        !groupData.users.includes(user.id)
    );
    setOptions(filteredOptions);
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={materialClasses.dialogTitleSection}>
          <DialogTitle
            className={materialClasses.dialogTitleText}
            id="form-dialog-title"
          >
            Add Friends to {groupData.groupName}
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Box mt={2}>
            <form onSubmit={onSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid xs={12} item>
                  <Autocomplete
                    className={componentClasses.form}
                    multiple
                    filterSelectedOptions
                    options={options}
                    onInputChange={inputChange}
                    onChange={handleSelect}
                    getOptionLabel={(option) => option.username}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={option.username}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add friends"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{option.username}</span>
                      </React.Fragment>
                    )}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={selectedFriends.length === 0}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .4)',
    borderRadius: 5,
    width: 332,
  },
  dialogTitleText: {
    display: 'inline',
    padding: 0,
  },
  dialogTitleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: 'center',
  },
}));

const Group = ({ currentUser, groupData }) => {
  const component = componentStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={handleClose}
        fullScreen
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={component.dialogTitleSection}>
          <DialogTitle
            className={component.dialogTitleText}
            id="form-dialog-title"
          >
            Virtual Group Profile
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <VirtualGroupInfo currentUser={currentUser} groupData={groupData} />
        </DialogContent>
      </Dialog>
      <ListItem button onClick={handleClickOpen}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="body1" noWrap>
              {groupData.groupName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="button">{groupData.moduleCode}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export const YourGroupsSmall = ({ currentUser, yourGroups }) => {
  const component = componentStyles();
  return (
    <List className={component.root}>
      {yourGroups.map((virtualGroup, index) => (
        <Group key={index} currentUser={currentUser} groupData={virtualGroup} />
      ))}
    </List>
  );
};

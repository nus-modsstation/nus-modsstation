import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

import {
  leaveGroupStart,
  deleteGroupStart,
  acceptUserRequestStart,
  removeUserRequestStart,
} from '../../redux/virtualGroup/virtualGroup.action';
import { readDocument } from '../../services/firestore';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .4)',
    borderRadius: 5,
    // width: 332,
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

const GroupComponent = ({
  currentUser,
  groupData,
  leaveGroupStart,
  deleteGroupStart,
  acceptJoinRequestStart,
  removeJoinRequestStart,
}) => {
  const component = componentStyles();

  const [open, setOpen] = React.useState(false);
  const [usernameMap, setUsernameMap] = React.useState({});
  const [userRequestsMap, setUserRequestsMap] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const leaveGroup = () => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    leaveGroupStart(virtualGroupData);
    const idx = groupData.users.indexOf(currentUser.id);
    if (idx !== -1) {
      groupData.users.splice(idx, 1);
    }
    setOpen(false);
  };

  const deleteGroup = () => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
    };
    deleteGroupStart(virtualGroupData);
    setOpen(false);
  };

  const removeUserRequest = (userId) => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: userId,
    };
    removeJoinRequestStart(virtualGroupData);
    /*
    const idx = groupData.userRequests.indexOf(userId);
    if (idx !== -1) {
      groupData.userRequests.splice(idx, 1);
    }
    */
    groupData.userRequests = groupData.userRequests.filter(
      (id) => id !== userId
    );
  };

  const acceptUserRequest = (userId) => {
    removeUserRequest(userId);
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: userId,
    };
    acceptJoinRequestStart(virtualGroupData);
    groupData.users.push(userId);
  };

  useEffect(() => {
    groupData.users.forEach(async (userId) => {
      const user = await readDocument({ collection: 'users', docId: userId });
      usernameMap[userId] = user.username;
      setUsernameMap(usernameMap);
    });
    groupData.userRequests.forEach(async (userId) => {
      const user = await readDocument({ collection: 'users', docId: userId });
      userRequestsMap[userId] = user.username;
      setUserRequestsMap(userRequestsMap);
    });
  }, [groupData, usernameMap, userRequestsMap]);

  const membersArray = [];
  for (var i in usernameMap) {
    membersArray.push({ id: i, username: usernameMap[i] });
  }
  const joinRequestsArray = [];
  for (var j in userRequestsMap) {
    joinRequestsArray.push({ id: j, username: userRequestsMap[j] });
  }
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
          <VirtualGroupInfo
            currentUser={currentUser}
            groupData={groupData}
            members={membersArray}
            joinRequests={joinRequestsArray}
            acceptJoinRequest={acceptUserRequest}
            removeJoinRequest={removeUserRequest}
            leaveGroup={leaveGroup}
            deleteGroup={deleteGroup}
          />
        </DialogContent>
      </Dialog>
      <ListItem button onClick={handleClickOpen}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={9}>
            <Typography variant="body1" noWrap>
              {groupData.groupName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" maxWidth={1} justifyContent="flex-end">
              <Typography variant="button" align="right">
                {groupData.moduleCode}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  leaveGroupStart: (groupData) => dispatch(leaveGroupStart(groupData)),
  deleteGroupStart: (groupData) => dispatch(deleteGroupStart(groupData)),
  removeJoinRequestStart: (groupData) =>
    dispatch(removeUserRequestStart(groupData)),
  acceptJoinRequestStart: (groupData) =>
    dispatch(acceptUserRequestStart(groupData)),
});

const Group = connect(mapStateToProps, mapDispatchToProps)(GroupComponent);

export const YourGroupsSmall = ({ currentUser, yourGroups }) => {
  const component = componentStyles();
  return (
    <List width={1} className={component.root}>
      {yourGroups &&
        yourGroups.map((virtualGroup, index) => (
          <Group
            key={index}
            currentUser={currentUser}
            groupData={virtualGroup}
          />
        ))}
    </List>
  );
};

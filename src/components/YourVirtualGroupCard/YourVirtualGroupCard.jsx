import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import rocketIcon from '@iconify/icons-mdi/rocket';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@material-ui/core';

import {
  leaveGroupStart,
  deleteGroupStart,
  acceptUserRequestStart,
  removeUserRequestStart,
} from '../../redux/virtualGroup/virtualGroup.action';
import { readDocument } from '../../services/firestore';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  card: {
    // blue: Virtual groups
    backgroundColor: 'rgba(75, 119, 190, 0.4)',
  },
  cardContent: {
    margin: '5px 0px',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  button: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
  groupPicture: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    marginRight: 10,
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

const YourGroupCardComponent = ({
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
    <Box width={1} component={Paper} className={component.card} mb="5px">
      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={handleClose}
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
      <Box
        component={ButtonBase}
        style={{
          textDecoration: 'none',
          color: 'black',
          '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
            color: 'black',
          },
        }}
        onClick={handleClickOpen}
        minWidth={1}
        p="12px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
      >
        <Typography variant="caption" align="left">
          {groupData.moduleCode}
        </Typography>
        <Box className={component.cardContent}>
          <Icon
            icon={rocketIcon}
            color="#616161"
            className={component.groupPicture}
          />
          <Box height={1} maxWidth={0.75}>
            <Typography variant="body1" noWrap align="left">
              {groupData.groupName}
            </Typography>
            <Box my="2px">
              <Typography component="p" variant="caption" align="left" noWrap>
                {groupData.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
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

export const YourGroupCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(YourGroupCardComponent);

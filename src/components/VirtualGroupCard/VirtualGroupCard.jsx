import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Icon } from '@iconify/react';
import rocketIcon from '@iconify/icons-mdi/rocket';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {
  leaveGroupStart,
  deleteGroupStart,
  sendJoinRequestStart,
  acceptUserRequestStart,
  removeUserRequestStart,
} from '../../redux/virtualGroup/virtualGroup.action';
import { selectSendRequestSuccess } from '../../redux/virtualGroup/virtualGroup.selector';
import { readDocument } from '../../services/firestore';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  flexCard: {
    [theme.breakpoints.down('xs')]: {
      height: 164,
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      height: 200,
      width: 178,
    },
    marginRight: 25,
    marginBottom: 15,
    padding: 8,
    cursor: 'pointer',
    // blue: Virtual groups
    backgroundColor: 'rgba(75, 119, 190, 0.3)',
  },
  card: {
    flex: 'none',
    height: 200,
    width: 175,
    marginRight: 25,
    marginBottom: 5,
    padding: 8,
    cursor: 'pointer',
    // green: Study groups
    // backgroundColor: 'rgba(30, 130, 76, 0.3)',
    // blue: Virtual groups
    backgroundColor: 'rgba(75, 119, 190, 0.3)',
    // orange: QA threads
    // backgroundColor: 'rgba(250, 190, 88, 0.3)',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  groupPicture: {
    width: 50,
    height: 50,
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

const VirtualGroupCardComponent = ({
  currentUser,
  modulePage,
  groupData,
  sendJoinRequestStart,
  acceptJoinRequestStart,
  removeJoinRequestStart,
  leaveGroupStart,
  deleteGroupStart,
}) => {
  const component = componentStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const isMember = groupData.users.includes(currentUser.id);

  const [open, setOpen] = React.useState(false);
  const [requestSent, setRequestSent] = React.useState(
    groupData.userRequests.includes(currentUser.id)
  );
  //eslint-disable-next-line
  const [usernameMap, setUsernameMap] = React.useState({});
  //eslint-disable-next-line
  const [userRequestsMap, setUserRequestsMap] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinRequestStart(updateGroupData);
  };

  const leaveGroup = () => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    leaveGroupStart(virtualGroupData);
    groupData.users = groupData.users.filter((id) => id !== currentUser.id);
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
    });
    groupData.userRequests.forEach(async (userId) => {
      const user = await readDocument({ collection: 'users', docId: userId });
      userRequestsMap[userId] = user.username;
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
    <Box>
      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={handleClose}
        fullScreen={xs}
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
            sendJoinRequest={sendJoinRequest}
            acceptJoinRequest={acceptUserRequest}
            removeJoinRequest={removeUserRequest}
            leaveGroup={leaveGroup}
            deleteGroup={deleteGroup}
          />
        </DialogContent>
      </Dialog>
      <Card
        variant="outlined"
        className={modulePage ? component.flexCard : component.card}
      >
        <Box
          height={1}
          width={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            maxHeight={modulePage ? (xs ? 0.72 : 0.66) : 0.66}
            onClick={handleClickOpen}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <Icon
                icon={rocketIcon}
                color="#616161"
                className={component.groupPicture}
              />
            </Box>
            <Box
              width={1}
              p="4px"
              mb="4px"
              display="flex"
              justifyContent="center"
            >
              <Typography
                variant={modulePage ? (xs ? 'body1' : 'body2') : 'body2'}
                align="center"
                noWrap
              >
                <strong>{groupData.groupName}</strong>
              </Typography>
            </Box>
            <Box width={1} px="4px" height="auto" overflow="hidden">
              <Typography variant="caption" component="p" align="center">
                {groupData.description}
              </Typography>
            </Box>
          </Box>
          <Button
            disabled={isMember || requestSent}
            onClick={sendJoinRequest}
            fullWidth
          >
            {isMember ? 'Joined' : requestSent ? 'Pending' : 'Join'}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  sendRequestSuccess: selectSendRequestSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  sendJoinRequestStart: (groupData) =>
    dispatch(sendJoinRequestStart(groupData)),
  leaveGroupStart: (groupData) => dispatch(leaveGroupStart(groupData)),
  deleteGroupStart: (groupData) => dispatch(deleteGroupStart(groupData)),
  removeJoinRequestStart: (groupData) =>
    dispatch(removeUserRequestStart(groupData)),
  acceptJoinRequestStart: (groupData) =>
    dispatch(acceptUserRequestStart(groupData)),
});

export const VirtualGroupCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupCardComponent);

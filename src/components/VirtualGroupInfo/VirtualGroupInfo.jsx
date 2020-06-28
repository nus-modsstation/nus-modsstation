import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Chat from '@material-ui/icons/Chat';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import IconButton from '@material-ui/core/IconButton';

import {
  sendJoinRequestStart,
  acceptUserRequestStart,
  removeUserRequestStart,
} from '../../redux/virtualGroup/virtualGroup.action';
import { selectSendRequestSuccess } from '../../redux/virtualGroup/virtualGroup.selector';

const VirtualGroupInfoComponent = ({
  currentUser,
  groupData,
  members,
  joinRequests,
  sendJoinRequestStart,
  acceptJoinRequestStart,
  removeJoinRequestStart,
  leaveGroup,
  deleteGroup,
}) => {
  const usernameArray = [];
  for (var i in members) {
    usernameArray.push(members[i]);
  }

  const joinRequestsArray = [];
  for (var j in joinRequests) {
    joinRequestsArray.push({ id: j, username: joinRequests[j] });
  }

  const isOwner = currentUser.id === groupData.ownerId;
  const isMember = groupData.users.find((userId) => currentUser.id === userId);

  const [requestSent, setRequestSent] = React.useState(
    groupData.userRequests.includes(currentUser.id)
  );

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinRequestStart(updateGroupData);
  };

  const removeUserRequest = (userId) => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: userId,
    };
    removeJoinRequestStart(virtualGroupData);
    const idx = groupData.userRequests.indexOf(userId);
    if (idx !== -1) {
      groupData.userRequests.splice(idx, 1);
    }
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

  return (
    <Box m="10px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  flex="none"
                  width="75px"
                  height="75px"
                  mr="15px"
                />
                <Typography variant="h5" noWrap>
                  {groupData.groupName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">About the group</Typography>
              <Box pt="15px" overflow="auto">
                <Typography variant="body1" paragraph>
                  {groupData.description
                    ? groupData.description
                    : "The whereabouts of the group's description remains a mystery to this day."}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={10}>
                Members
              </Typography>
              <List>
                {usernameArray.map((username, index) => (
                  <ListItem disableGutters key={index}>
                    <Typography variant="body1" noWrap>
                      {username}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            {isOwner && joinRequestsArray.length > 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6">Join Requests</Typography>
                <List>
                  {joinRequestsArray.map((user, index) => (
                    <ListItem disableGutters key={index}>
                      <Typography variant="body1" noWrap>
                        {user.username}
                      </Typography>
                      <ListItemSecondaryAction>
                        <IconButton color="secondary">
                          <CheckCircleRoundedIcon
                            onClick={acceptUserRequest(user.id)}
                          />
                        </IconButton>
                        <IconButton color="error">
                          <CancelRoundedIcon
                            onClick={removeUserRequest(user.id)}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          {isOwner ? (
            <List disablePadding>
              <ListItem button mb="10px" alignItems="center">
                <Box mr="10px">
                  <Chat fontSize="small" />
                </Box>
                <Typography variant="subtitle2">Chat room</Typography>
              </ListItem>
              <ListItem button mb="10px" alignItems="center">
                <Box mr="10px">
                  <PersonAdd fontSize="small" />
                </Box>
                <Typography variant="subtitle2">Add friend</Typography>
              </ListItem>
              <ListItem
                button
                onClick={deleteGroup}
                mb="10px"
                alignItems="center"
              >
                <Typography color="error" variant="subtitle2">
                  Delete group
                </Typography>
              </ListItem>
            </List>
          ) : isMember ? (
            <List disablePadding>
              <ListItem button mb="10px" alignItems="center">
                <Box mr="10px">
                  <Chat fontSize="small" />
                </Box>
                <Typography variant="subtitle2">Chat room</Typography>
              </ListItem>
              <ListItem button mb="10px" alignItems="center">
                <Box mr="10px">
                  <PersonAdd fontSize="small" />
                </Box>
                <Typography variant="subtitle2">Add friend</Typography>
              </ListItem>
              <ListItem
                button
                onClick={leaveGroup}
                mb="10px"
                alignItems="center"
              >
                <Typography color="error" variant="subtitle2">
                  Leave group
                </Typography>
              </ListItem>
            </List>
          ) : (
            <Button
              disabled={requestSent}
              onClick={sendJoinRequest}
              variant="contained"
              fullWidth
            >
              {requestSent ? 'Pending' : 'Join'}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  sendRequestSuccess: selectSendRequestSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  sendJoinRequestStart: (groupData) =>
    dispatch(sendJoinRequestStart(groupData)),
  removeJoinRequestStart: (groupData) =>
    dispatch(removeUserRequestStart(groupData)),
  acceptJoinRequestStart: (groupData) =>
    dispatch(acceptUserRequestStart(groupData)),
});

export const VirtualGroupInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupInfoComponent);

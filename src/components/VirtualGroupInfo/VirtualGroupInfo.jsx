import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import rocketIcon from '@iconify/icons-mdi/rocket';
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

import { selectSendRequestSuccess } from '../../redux/virtualGroup/virtualGroup.selector';

const infoStyles = makeStyles({
  groupPicture: {
    flex: 'none',
    width: '75px',
    height: '75px',
    marginRight: '15px',
  },
});

const JoinRequestItem = ({ user, removeJoinRequest, acceptJoinRequest }) => {
  const [accepted, setAccepted] = React.useState(false);
  const [declined, setDeclined] = React.useState(false);

  const declineRequest = (userId) => {
    removeJoinRequest(userId);
    setDeclined(true);
  };

  const acceptRequest = (userId) => {
    acceptJoinRequest(userId);
    setAccepted(true);
  };

  return (
    <ListItem disableGutters key={user.id}>
      <Typography variant="body1" noWrap>
        {user.username}
      </Typography>
      <ListItemSecondaryAction>
        {accepted ? (
          <div>
            <Typography variant="button" color="secondary">
              Accepted
            </Typography>
          </div>
        ) : declined ? (
          <div>
            <Typography variant="button" color="error">
              Removed
            </Typography>
          </div>
        ) : (
          <div>
            <IconButton
              color="secondary"
              onClick={() => acceptRequest(user.id)}
            >
              <CheckCircleRoundedIcon />
            </IconButton>
            <IconButton onClick={() => declineRequest(user.id)}>
              <CancelRoundedIcon />
            </IconButton>
          </div>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const VirtualGroupInfoComponent = ({
  currentUser,
  groupData,
  members,
  joinRequests,
  sendJoinRequest,
  sendRequestSuccess,
  acceptJoinRequest,
  removeJoinRequest,
  leaveGroup,
  deleteGroup,
}) => {
  const infoClasses = infoStyles();
  const [joinRequestsState, setJoinRequestsState] = React.useState(
    joinRequests
  );

  const isOwner = currentUser.id === groupData.ownerId;
  const isMember = groupData.users.find((userId) => currentUser.id === userId);

  const [requestSent, setRequestSent] = React.useState(
    groupData.userRequests.includes(currentUser.id)
  );

  const sendUpdateJoinRequest = async () => {
    sendJoinRequest();
    setRequestSent(true);
    const newState = joinRequestsState.filter(
      (user) => user.id !== currentUser.id
    );
    setJoinRequestsState(newState);
  };

  const removeUpdateJoinRequest = async (userId) => {
    removeJoinRequest(userId);
    const newState = joinRequestsState.filter((user) => user.id !== userId);
    setJoinRequestsState(newState);
  };

  const acceptUpdateJoinRequest = async (userId) => {
    acceptJoinRequest(userId);
    const newState = joinRequestsState.filter((user) => user.id !== userId);
    setJoinRequestsState(newState);
  };

  useEffect(() => {
    if (sendRequestSuccess) {
      setRequestSent(true);
    }
  }, [sendRequestSuccess]);

  return (
    <Box m="10px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Icon
                  icon={rocketIcon}
                  color="#616161"
                  className={infoClasses.groupPicture}
                />
                <Box display="flex" flexDirection="column">
                  <Box mb={1}>
                    <Typography variant="button">
                      {groupData.moduleCode}
                    </Typography>
                  </Box>
                  <Typography variant="h5" noWrap>
                    {groupData.groupName}
                  </Typography>
                </Box>
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
                {members.map((user) => (
                  <ListItem disableGutters key={user.id}>
                    <Typography variant="body1" noWrap>
                      {user.username}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            {isOwner && joinRequestsState.length > 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6">Join Requests</Typography>
                <List>
                  {joinRequestsState.map((user) => (
                    <JoinRequestItem
                      key={user.id}
                      user={user}
                      removeJoinRequest={removeUpdateJoinRequest}
                      acceptJoinRequest={acceptUpdateJoinRequest}
                    />
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
              <ListItem
                component={Link}
                to={`/chat-room/${groupData.id}`}
                button
                mb="10px"
                alignItems="center"
              >
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
              <ListItem
                component={Link}
                to={`/chat-room/${groupData.id}`}
                button
                mb="10px"
                alignItems="center"
              >
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
              onClick={sendUpdateJoinRequest}
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

export const VirtualGroupInfo = connect(mapStateToProps)(
  VirtualGroupInfoComponent
);

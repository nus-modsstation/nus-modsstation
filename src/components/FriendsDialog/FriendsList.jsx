import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  acceptRequestStart,
  removeRequestStart,
  removeFriendStart,
} from '../../redux/user/user.action';
import { sendFriendRequest } from '../../services/users';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EmailIcon from '@material-ui/icons/Email';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const FriendsListComponent = ({
  currentUser,
  isSearch,
  isRequest,
  friendsData,
  loading,
  acceptRequestStart,
  removeRequestStart,
  removeFriendStart,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const checkRequestSent = () => {
    if (
      isSearch &&
      friendsData &&
      friendsData.length > 0 &&
      currentUser &&
      (friendsData[0].friendRequests.includes(currentUser.id) ||
        currentUser.friendRequests.includes(friendsData[0].id))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [requestSent, setRequestSent] = useState(checkRequestSent);

  const sendRequest = async (receivedUserId) => {
    try {
      await sendFriendRequest({
        sentUserId: currentUser.id,
        receivedUserId,
      });
      setRequestSent(true);
    } catch (error) {
      console.log('send request error:', error.toString());
    }
  };

  const acceptRequest = async (requestUserId) => {
    try {
      await acceptRequestStart({
        id: currentUser.id,
        data: requestUserId,
      });
    } catch (error) {
      console.log('accept request error:', error.toString());
    }
  };

  const removeRequest = async (requestUserId) => {
    try {
      await removeRequestStart({
        id: currentUser.id,
        data: requestUserId,
      });
    } catch (error) {
      console.log('remove request error:', error.toString());
    }
  };

  const removeFriend = async (friendId) => {
    try {
      await removeFriendStart({
        id: currentUser.id,
        data: friendId,
      });
    } catch (error) {
      console.log('remove friend error:', error.toString());
    }
  };

  useEffect(() => {
    // update send request
    console.log('isSearch:', isSearch);
    console.log('friendsData:', friendsData);
    if (
      isSearch &&
      friendsData &&
      friendsData.length > 0 &&
      currentUser &&
      (friendsData[0].friendRequests.includes(currentUser.id) ||
        currentUser.friendRequests.includes(friendsData[0].id))
    ) {
      setRequestSent(true);
    } else if (isSearch) {
      setRequestSent(false);
    }
  }, [friendsData, currentUser, isSearch]);

  return (
    <List dense className={classes.root}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
        </Box>
      ) : friendsData && friendsData.length > 0 ? (
        friendsData.map((friend) => {
          if (friend.id === currentUser.id) {
            return <Box>You can't add yourself as friend</Box>;
          } else {
            return (
              <ListItem key={friend.email}>
                <ListItemAvatar>
                  <Avatar>{friend.username.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${friend.username}`} />
                <ListItemSecondaryAction>
                  {isSearch ? (
                    <Button
                      disabled={requestSent}
                      variant="outlined"
                      size="small"
                      startIcon={<PersonAddIcon style={{ color: '#009688' }} />}
                      onClick={() => sendRequest(friend.id)}
                    >
                      {!isXs && (
                        <span style={{ color: '#009688' }}>
                          {requestSent ? 'Sent' : 'Add'}
                        </span>
                      )}
                    </Button>
                  ) : isRequest ? (
                    <ButtonGroup>
                      <Button
                        size="small"
                        startIcon={<EmailIcon style={{ color: '#009688' }} />}
                        onClick={() => acceptRequest(friend.id)}
                      >
                        {!isXs && (
                          <span style={{ color: '#009688' }}>Accept</span>
                        )}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon style={{ color: '#f44336' }} />}
                        onClick={() => removeRequest(friend.id)}
                      >
                        {!isXs && (
                          <span style={{ color: '#f44336' }}>Remove</span>
                        )}
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup>
                      <Button
                        size="small"
                        startIcon={<EmailIcon style={{ color: '#421cf8' }} />}
                      >
                        {!isXs && (
                          <span style={{ color: '#421cf8' }}>Chat</span>
                        )}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<DeleteIcon style={{ color: '#f44336' }} />}
                        onClick={() => removeFriend(friend.id)}
                      >
                        {!isXs && (
                          <span style={{ color: '#f44336' }}>Remove</span>
                        )}
                      </Button>
                    </ButtonGroup>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
        })
      ) : isSearch && friendsData && friendsData.length === 0 ? (
        <Box>No user found</Box>
      ) : (
        <Box />
      )}
    </List>
  );
};

const mapDispatchToProps = (dispatch) => ({
  acceptRequestStart: (requestData) =>
    dispatch(acceptRequestStart(requestData)),
  removeRequestStart: (requestData) =>
    dispatch(removeRequestStart(requestData)),
  removeFriendStart: (requestData) => dispatch(removeFriendStart(requestData)),
});

export const FriendsList = connect(
  null,
  mapDispatchToProps
)(FriendsListComponent);

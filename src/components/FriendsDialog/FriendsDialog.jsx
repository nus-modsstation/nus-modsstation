import React, { useState, useEffect } from 'react';

import { readDocument } from '../../services/firestore';

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { materialStyles } from '../../styles/material.styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { FriendsList } from './FriendsList';
import { FriendsSearch } from './FriendsSearch';
import { Typography } from '@material-ui/core';

export const FriendsDialog = ({ currentUser, openDialog, closeCallback }) => {
  const materialClasses = materialStyles();
  const [open, setOpen] = useState(openDialog);

  const [requestUsers, setRequestUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  const fetchRequestNames = async () => {
    let userData = [];
    await currentUser.friendRequests.forEach(async (userId) => {
      const user = await readDocument({
        collection: 'users',
        docId: userId,
      });
      userData.push(user);
    });
    setRequestUsers(userData);
  };

  useEffect(() => {
    const fetchFriendNames = async () => {
      let userData = [];
      // ensure for each is async
      // wait to fetch username for all the friends
      // before setFriends
      const asyncForEach = async (arr, callback) => {
        for (let i = 0; i < arr.length; i++) {
          await callback(arr[i]);
        }
      };
      const start = async () => {
        await asyncForEach(currentUser.friends, async (userId) => {
          const user = await readDocument({
            collection: 'users',
            docId: userId,
          });
          userData.push(user);
        });
        setFriends(userData);
      };
      start();
    };

    if (currentUser) {
      fetchFriendNames();
      fetchRequestNames();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        fullScreen={fullScreen}
        fullWidth
      >
        <Box className={materialClasses.dialogTitleSection}>
          <DialogTitle
            className={materialClasses.dialogTitleText}
            id="form-dialog-title"
          >
            Friends
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {/* Add "&& currentUser.isVerified" below after setting up email verification  */}
          {currentUser ? (
            <div style={{ height: '100%', overflow: 'hidden' }}>
              {requestUsers.length > 0 && (
                <Box>
                  <Typography>Friend requests</Typography>
                  <FriendsList
                    currentUser={currentUser}
                    isRequest={true}
                    friendsData={requestUsers}
                  />
                </Box>
              )}
              <FriendsSearch currentUser={currentUser} />
              <FriendsList currentUser={currentUser} friendsData={friends} />
            </div>
          ) : (
            <DialogContentText>
              {currentUser
                ? 'Please verify your email.'
                : 'Please log in to your account.'}
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

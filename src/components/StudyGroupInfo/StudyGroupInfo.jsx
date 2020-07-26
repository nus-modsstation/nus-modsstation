import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { readDocument } from '../../services/firestore';
import { selectSendRequestSuccess } from '../../redux/studyGroup/studyGroup.selector';
import {
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
  leaveGroupStart,
  deleteGroupStart,
} from '../../redux/studyGroup/studyGroup.action';

import { formatDateTime } from '../../utils/formatDate';

import { Typography, Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import { materialStyles } from '../../styles/material.styles';

const StudyGroupInfoComponent = ({
  openDialog = false,
  closeCallback,
  currentUser,
  studyGroup,
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
  leaveGroupStart,
  deleteGroupStart,
}) => {
  const materialClasses = materialStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isOwner = currentUser !== null && studyGroup.ownerId === currentUser.id;
  const [open, setOpen] = useState(openDialog);
  const [userMap, setUserMap] = useState({});
  const [requestMap, setRequestMap] = useState({});
  const isJoined =
    currentUser !== null && studyGroup.users.includes(currentUser.id);
  const [isRequestSent, setRequestSent] = useState(
    currentUser !== null && studyGroup.userRequests.includes(currentUser.id)
  );

  const handleClose = () => {
    setOpen(false);
    closeCallback();
  };

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinGroupStart(updateGroupData);
  };

  const acceptUserRequest = (userId) => {
    // add it to members, update the UI
    const updatedUsers = {
      ...userMap,
      [userId]: requestMap[userId],
    };
    setUserMap(updatedUsers);
    removeUserRequest(userId);
    const studyGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: userId,
    };
    acceptUserRequestStart(studyGroupData);
    studyGroup.users.push(userId);
  };

  const removeUserRequest = (userId) => {
    // delete it from requests, update the UI
    delete requestMap[userId];
    setRequestMap(requestMap);
    const studyGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: userId,
    };
    removeUserRequestStart(studyGroupData);
    const idx = studyGroup.userRequests.indexOf(userId);
    if (idx !== -1) {
      studyGroup.userRequests.splice(idx, 1);
    }
  };

  const leaveGroup = () => {
    const studyGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: currentUser.id,
    };
    leaveGroupStart(studyGroupData);
    const idx = studyGroup.users.indexOf(currentUser.id);
    if (idx !== -1) {
      studyGroup.users.splice(idx, 1);
    }
    setOpen(false);
  };

  const deleteGroup = () => {
    const studyGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
    };
    deleteGroupStart(studyGroupData);
    setOpen(false);
  };

  const fetchUserNames = async () => {
    let userData = {};
    await studyGroup.users.forEach(async (userId) => {
      const user = await readDocument({
        collection: 'users',
        docId: userId,
      });
      userData[userId] = user.username;
    });
    setUserMap(userData);
  };

  const fetchRequestNames = async () => {
    let requestData = {};
    await studyGroup.userRequests.forEach(async (userId) => {
      const user = await readDocument({
        collection: 'users',
        docId: userId,
      });
      requestData[userId] = user.username;
    });
    setRequestMap(requestData);
  };

  useEffect(() => {
    fetchUserNames();
    // diplay group users' request for group's owner
    if (isOwner) {
      fetchRequestNames();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      aria-labelledby="form-dialog-title"
      disableBackdropClick
    >
      <Box className={materialClasses.dialogTitleSection}>
        <DialogTitle
          className={materialClasses.dialogTitleText}
          id="form-dialog-title"
        >
          {studyGroup.title}
        </DialogTitle>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Chip
              icon={<ImportContactsIcon />}
              color="primary"
              variant="outlined"
              label={studyGroup.moduleCode}
            />
            <Box display="inline" m={1} />
            <Chip
              icon={<LocationOnIcon />}
              color="secondary"
              variant="outlined"
              label={studyGroup.location}
            />
            <Box display="inline" m={1} />
            <Chip
              icon={<TodayIcon />}
              variant="outlined"
              label={`${formatDateTime(
                studyGroup.startTime
              )} - ${formatDateTime(studyGroup.endTime)}`}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">About the group</Typography>
                <Box pt={1} overflow="auto">
                  <Typography variant="body1">
                    {studyGroup.description
                      ? studyGroup.description
                      : "The whereabouts of the group's description remains a mystery to this day."}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Members</Typography>
                <List dense>
                  {studyGroup.users.map((userId) => (
                    <ListItem key={userId}>
                      <ListItemText primary={userMap[userId]} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              {isOwner &&
                studyGroup.userRequests.length > 0 &&
                Object.entries(requestMap).length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Requests</Typography>
                    <List dense>
                      {Object.keys(requestMap).map((userId) => (
                        <ListItem key={userId}>
                          <ListItemText primary={requestMap[userId]} />
                          <ListItemSecondaryAction>
                            <IconButton
                              color="secondary"
                              onClick={() => acceptUserRequest(userId)}
                            >
                              <CheckCircleRoundedIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => removeUserRequest(userId)}
                            >
                              <CancelRoundedIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container justify="center" spacing={2}>
              <Box m={1} />
              {!isOwner && !isJoined && (
                <Grid item xs={12}>
                  <Button
                    disabled={currentUser === null || isJoined || isRequestSent}
                    onClick={sendJoinRequest}
                    variant="contained"
                    color="primary"
                  >
                    {`${
                      isJoined ? 'Joined' : isRequestSent ? 'Pending' : 'Join'
                    }`}
                  </Button>
                </Grid>
              )}
              {isJoined && (
                <Grid item xs={12}>
                  <Button
                    component={Link}
                    to={`chat-room/${studyGroup.id}`}
                    size="small"
                    variant="outlined"
                  >
                    Chat room
                  </Button>
                </Grid>
              )}
              {isJoined && !isOwner && (
                <Grid item xs={12}>
                  <Button onClick={leaveGroup} size="small" variant="outlined">
                    Leave
                  </Button>
                </Grid>
              )}
              {isOwner && (
                <Grid item xs={12}>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </Grid>
              )}
              {isOwner && (
                <Grid item xs={12}>
                  <Button onClick={deleteGroup} size="small" variant="outlined">
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Box m={1} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  sendRequestSuccess: selectSendRequestSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  sendJoinGroupStart: (studyGroupData) =>
    dispatch(sendJoinGroupStart(studyGroupData)),
  removeUserRequestStart: (studyGroupData) =>
    dispatch(removeUserRequestStart(studyGroupData)),
  acceptUserRequestStart: (studyGroupData) =>
    dispatch(acceptUserRequestStart(studyGroupData)),
  leaveGroupStart: (studyGroupData) =>
    dispatch(leaveGroupStart(studyGroupData)),
  deleteGroupStart: (studyGroupData) =>
    dispatch(deleteGroupStart(studyGroupData)),
});

export const StudyGroupInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupInfoComponent);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { readDocument } from '../../services/firestore';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectSendRequestSuccess } from '../../redux/studyGroup/studyGroup.selector';
import {
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
  leaveGroupStart,
  deleteGroupStart,
} from '../../redux/studyGroup/studyGroup.action';
import { formatTime, formatDateTime } from '../../utils/formatDate';

import Paper from '@material-ui/core/Paper';
import { Typography, Box, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { materialStyles } from '../../styles/material.styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export const StudyGroupCardComponent = ({
  currentUser,
  studyGroup,
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
  hideJoin,
  leaveGroupStart,
  deleteGroupStart,
}) => {
  const chipStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '6px',
    paddingRight: '6px',
  };
  const classes = materialStyles();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const joinStudyGroup = (event) => {
    event.stopPropagation();
    sendJoinRequest();
  };

  const isOwner = studyGroup.ownerId === currentUser.id;
  const isJoined = studyGroup.users.includes(currentUser.id);
  const [isRequestSent, setRequestSent] = useState(
    studyGroup.userRequests.includes(currentUser.id)
  );
  const [userMap, setUserMap] = useState({});
  const [requestMap, setRequestMap] = useState({});

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinGroupStart(updateGroupData);
  };

  const removeUserRequest = (userId) => {
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

  const acceptUserRequest = (userId) => {
    removeUserRequest(userId);
    const studyGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: userId,
    };
    acceptUserRequestStart(studyGroupData);
    studyGroup.users.push(userId);
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

  useEffect(() => {
    // this behaves like componentDidMount
    // show member requests if the user is the group's owner
    // read username by userId
    // display group members for users
    let isMounted = true;
    studyGroup.users.forEach(async (userId) => {
      const user = await readDocument({
        collection: 'users',
        docId: userId,
      });
      const data = {
        ...userMap,
        [userId]: user.username,
      };
      console.log('studyGroup: ', studyGroup.id);
      console.log('data: ', data);
      if (isMounted) {
        setUserMap(data);
      }
    });
    // diplay group users' request for group's owner
    if (studyGroup.ownerId === currentUser.id) {
      studyGroup.userRequests.forEach(async (userId) => {
        const user = await readDocument({
          collection: 'users',
          docId: userId,
        });
        const data = {
          ...requestMap,
          [userId]: user.username,
        };
        if (isMounted) {
          setRequestMap(data);
        }
      });
    }
    return () => {
      isMounted = false;
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.clickableCursor}>
      <Paper onClick={handleClick} variant="outlined">
        <Box pt={2} pl={2} pr={2}>
          <Typography noWrap variant="body1">
            {studyGroup.title}
          </Typography>
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<ImportContactsIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            color="primary"
            variant="outlined"
            label={studyGroup.moduleCode}
          />
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<LocationOnIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            color="secondary"
            variant="outlined"
            label={studyGroup.location}
          />
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<TodayIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            variant="outlined"
            label={formatTime(studyGroup.startTime, studyGroup.endTime)}
          />
          <Box mt={1} />
          {hideJoin ? (
            <Box m={3} />
          ) : (
            <Button
              disabled={isJoined || isRequestSent}
              size="large"
              onClick={joinStudyGroup}
              fullWidth
            >
              {`${isJoined ? 'Joined' : isRequestSent ? 'Pending' : 'Join'}`}
            </Button>
          )}
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={classes.dialogTitleSection}>
          <DialogTitle
            className={classes.dialogTitleText}
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
                onClick={() => {
                  console.log('clicked');
                }}
                color="primary"
                variant="outlined"
                label={studyGroup.moduleCode}
              />
              <Box display="inline" m={1} />
              <Chip
                icon={<LocationOnIcon />}
                onClick={() => {
                  console.log('clicked');
                }}
                color="secondary"
                variant="outlined"
                label={studyGroup.location}
              />
              <Box display="inline" m={1} />
              <Chip
                icon={<TodayIcon />}
                onClick={() => {
                  console.log('clicked');
                }}
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
                    {studyGroup.users.map((userId) => {
                      return (
                        <ListItem key={userId}>
                          <Typography variant="body1">
                            {userMap[userId]}
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
                {isOwner && studyGroup.userRequests.length !== 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Requests</Typography>
                    <List dense>
                      {studyGroup.userRequests.map((userId) => (
                        <ListItem key={userId}>
                          {requestMap[userId] && (
                            <ListItemText
                              id={userId}
                              primary={requestMap[userId]}
                            />
                          )}
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
                      disabled={isJoined || isRequestSent}
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
                    <Button size="small" variant="outlined">
                      Chat room
                    </Button>
                  </Grid>
                )}
                {isJoined && !isOwner && (
                  <Grid item xs={12}>
                    <Button
                      onClick={leaveGroup}
                      size="small"
                      variant="outlined"
                    >
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
                    <Button
                      onClick={deleteGroup}
                      size="small"
                      variant="outlined"
                    >
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
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
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

export const StudyGroupCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupCardComponent);

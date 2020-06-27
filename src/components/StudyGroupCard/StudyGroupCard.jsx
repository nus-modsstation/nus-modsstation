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
} from '../../redux/studyGroup/studyGroup.action';
import { formatTime, formatDateTime } from '../../utils/formatDate';

import Paper from '@material-ui/core/Paper';
import { Typography, Box, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
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

export const StudyGroupCardComponent = ({
  currentUser,
  studyGroup,
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
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
    event.preventDefault();
  };

  const isOwner = studyGroup.ownerId === currentUser.id;
  const isJoined = studyGroup.users.includes(currentUser.id);
  const [isRequestSent, setRequestSent] = useState(
    studyGroup.userRequests.includes(currentUser.id)
  );
  const [userMap, setUserMap] = useState({});

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

  useEffect(() => {
    // this behaves like componentDidMount
    // show member requests if the user is the group's owner
    // read username by userId
    if (studyGroup.ownerId === currentUser.id) {
      const idToName = {};
      studyGroup.users.forEach(async (userId) => {
        const user = await readDocument({
          collection: 'users',
          docId: userId,
        });
        idToName[userId] = user.username;
        setUserMap(idToName);
      });
      studyGroup.userRequests.forEach(async (userId) => {
        const user = await readDocument({
          collection: 'users',
          docId: userId,
        });
        idToName[userId] = user.username;
        setUserMap(idToName);
      });
      setUserMap(idToName);
    }
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
          <Button
            disabled={isJoined || isRequestSent}
            size="large"
            onClick={joinStudyGroup}
            fullWidth
          >
            {`${isJoined ? 'Joined' : isRequestSent ? 'Pending' : 'Join'}`}
          </Button>
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
          {isOwner && <Button variant="outlined">Edit</Button>}
          <Typography>
            {studyGroup.description === ''
              ? 'no description'
              : studyGroup.description}
          </Typography>
          <Typography>{studyGroup.moduleCode}</Typography>
          <Typography>{`${formatDateTime(
            studyGroup.startTime
          )} - ${formatDateTime(studyGroup.endTime)}`}</Typography>
          <Typography>{studyGroup.location}</Typography>
          <Box>
            <Typography>{`member: ${studyGroup.users.length}`}</Typography>
            <List dense>
              {studyGroup.users.map((userId) => {
                return (
                  <ListItem key={userId}>
                    <ListItemText id={userId} primary={userMap[userId]} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {!isOwner && !isJoined && (
            <Button
              disabled={isJoined || isRequestSent}
              onClick={sendJoinRequest}
              variant="contained"
              color="primary"
            >
              {`${isJoined ? 'Joined' : isRequestSent ? 'Pending' : 'Join'}`}
            </Button>
          )}
          {isOwner && studyGroup.userRequests.length !== 0 && (
            <Box>
              <Typography>Requests</Typography>
              <List dense>
                {studyGroup.userRequests.map((userId) => {
                  return (
                    <ListItem key={userId}>
                      <ListItemText id={userId} primary={userMap[userId]} />
                      <ListItemSecondaryAction>
                        <Button
                          color="secondary"
                          size="small"
                          onClick={() => acceptUserRequest(userId)}
                        >
                          Accept
                        </Button>
                        <Button
                          size="small"
                          onClick={() => removeUserRequest(userId)}
                        >
                          Reject
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}
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
});

export const StudyGroupCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupCardComponent);

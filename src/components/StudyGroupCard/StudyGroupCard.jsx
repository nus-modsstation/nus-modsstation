import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectSendRequestSuccess } from '../../redux/studyGroup/studyGroup.selector';
import {
  sendJoinGroupStart,
  removeUserRequestStart,
  acceptUserRequestStart,
  leaveGroupStart,
  deleteGroupStart,
} from '../../redux/studyGroup/studyGroup.action';
import { formatTime } from '../../utils/formatDate';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Box, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import { materialStyles } from '../../styles/material.styles';
import { StudyGroupInfo } from '../StudyGroupInfo/StudyGroupInfo';

const componentStyles = makeStyles({
  card: {
    width: 184,
    marginRight: 25,
    cursor: 'pointer',
  },
});

export const StudyGroupCardComponent = ({
  currentUser,
  studyGroup,
  sendJoinGroupStart,
  hideJoin,
}) => {
  const materialClasses = materialStyles();
  const componentClasses = componentStyles();

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const joinStudyGroup = (event) => {
    event.stopPropagation();
    sendJoinRequest();
  };

  const isJoined =
    currentUser !== null && studyGroup.users.includes(currentUser.id);
  const [isRequestSent, setRequestSent] = useState(
    currentUser !== null && studyGroup.userRequests.includes(currentUser.id)
  );

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: studyGroup.id,
      moduleCode: studyGroup.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinGroupStart(updateGroupData);
  };

  return (
    <Box className={componentClasses.card /*classes.clickableCursor*/}>
      <Paper
        style={{
          backgroundColor: 'rgba(30, 130, 76, 0.3)',
          width: 184,
        }}
        onClick={handleClick}
        variant="outlined"
      >
        <Box pt={2} pl={2} pr={2}>
          <Typography noWrap variant="body1">
            <strong>{studyGroup.title}</strong>
          </Typography>
          <Box mt={2} />
          <Chip
            className={materialClasses.chipStyle}
            icon={<ImportContactsIcon />}
            style={{ cursor: 'pointer' }}
            variant="outlined"
            label={studyGroup.moduleCode}
          />
          <Box mt={1} />
          <Chip
            className={materialClasses.chipStyle}
            icon={<LocationOnIcon />}
            style={{ cursor: 'pointer' }}
            variant="outlined"
            label={studyGroup.location}
          />
          <Box mt={1} />
          <Chip
            className={materialClasses.chipStyle}
            icon={<TodayIcon />}
            style={{ cursor: 'pointer' }}
            variant="outlined"
            label={formatTime(studyGroup.startTime, studyGroup.endTime)}
          />
          <Box mt={1} />
          {hideJoin ? (
            <Box m={3} />
          ) : (
            <Button
              disabled={currentUser === null || isJoined || isRequestSent}
              size="large"
              onClick={joinStudyGroup}
              fullWidth
            >
              {`${isJoined ? 'Joined' : isRequestSent ? 'Pending' : 'Join'}`}
            </Button>
          )}
          <Box mt={1} />
        </Box>
      </Paper>
      <StudyGroupInfo
        openDialog={open}
        currentUser={currentUser}
        studyGroup={studyGroup}
        closeCallback={() => setOpen(false)}
      />
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

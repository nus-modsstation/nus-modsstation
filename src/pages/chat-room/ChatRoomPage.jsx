import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { selectMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.selector';

import { materialStyles } from '../../styles/material.styles';
import { Box } from '@material-ui/core';
import { ChatRoomContainer } from '../../components/ChatRoom/ChatRoomContainer';
import { CustomAlert } from '../../components/shared/CustomAlert';

const ChatRoomComponent = ({ user, myGroups, myVirtualGroups }) => {
  const materialClasses = materialStyles();
  const { id } = useParams();
  const groupIndex = myGroups.findIndex((group) => group.id === id);
  const virtualGroupIndex = myVirtualGroups.findIndex(
    (group) => group.id === id
  );
  const roomData =
    groupIndex !== -1
      ? myGroups[groupIndex]
      : virtualGroupIndex !== -1
      ? myVirtualGroups[virtualGroupIndex]
      : null;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // fetch chatMessages
    // create a chatMessage
    // const chatMessage = {
    //   groupId: 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
    //   userId: user.id,
    //   message: 'This is the second message',
    // };
    // writeChatMessages(chatMessage);
  });

  return (
    <Box className={materialClasses.root}>
      {roomData !== null ? (
        <ChatRoomContainer roomData={roomData} user={user} />
      ) : (
        <CustomAlert
          severity="error"
          alertTitle="Invalid group id"
          alertText="There is no chat room associated with the group id."
        />
      )}
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
});

export const ChatRoomPage = connect(mapStateToProps)(ChatRoomComponent);

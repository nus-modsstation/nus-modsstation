import React, { useEffect } from 'react';

import { materialStyles } from '../../styles/material.styles';
import { Box } from '@material-ui/core';
import { ChatRoomContainer } from '../../components/ChatRoom/ChatRoomContainer';

export const ChatRoomPage = ({ user }) => {
  const materialClasses = materialStyles();

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
      <ChatRoomContainer user={user} />
    </Box>
  );
};

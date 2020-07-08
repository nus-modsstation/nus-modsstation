import React, { useState, useEffect } from 'react';

import { findUserById } from '../../services/users.js';
import { formatMessageTime } from '../../utils/formatDate';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';

export const MessageItem = ({ message }) => {
  const materialClasses = materialStyles();
  const [user, setUser] = useState({
    username: 'username',
  });

  useEffect(() => {
    const getUser = async () => {
      const result = await findUserById(message.userId);
      setUser(result);
      return result;
    };
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Box mt={2} mb={2} display="flex" flexDirection="row">
      <Box mr={1}>
        <Avatar className={materialClasses.userAvatar}>
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box mr={1} fontWeight="fontWeightBold">
            {user.username}
          </Box>
          <Box fontWeight="fontWeightLight">
            <Typography variant="caption">
              {formatMessageTime(message.timestamp)}
            </Typography>
          </Box>
        </Box>
        <Box mt={0.5}>
          <div>{message.message}</div>
        </Box>
      </Box>
    </Box>
  );
};

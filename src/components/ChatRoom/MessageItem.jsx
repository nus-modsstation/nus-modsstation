import React from 'react';

import { formatMessageTime } from '../../utils/formatDate';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

export const MessageItem = ({ message }) => {
  return (
    <Box mt={2} mb={2} display="flex" flexDirection="row">
      <Box mr={1}>
        <Avatar>H</Avatar>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box mr={1} fontWeight="fontWeightBold">
            name
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

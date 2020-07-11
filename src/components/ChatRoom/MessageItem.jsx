import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { findUserById } from '../../services/users.js';
import { formatMessageTime, formatDate } from '../../utils/formatDate';

import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Divider } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';
import Chip from '@material-ui/core/Chip';

export const MessageItem = ({ message, previousMessage }) => {
  const materialClasses = materialStyles();
  const [user, setUser] = useState({
    username: '',
  });
  const sameUser =
    previousMessage !== null && message.userId === previousMessage.userId;
  const sameTime =
    previousMessage !== null &&
    moment(previousMessage.timestamp).isSame(message.timestamp, 'minute');
  const isSameUserSameTime = sameUser && sameTime;

  const isDifferentDay =
    previousMessage !== null &&
    !moment(previousMessage.timestamp).isSame(message.timestamp, 'day');

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    const getUser = async () => {
      const result = await findUserById(message.userId);
      if (isMounted) {
        setUser(result);
      }
    };
    getUser();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      {(isDifferentDay || previousMessage === null) && (
        <Box mt={1} display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1}>
            <Divider />
          </Box>
          <Box>
            <Chip
              label={
                <Typography variant="caption">
                  {formatDate(message.timestamp)}
                </Typography>
              }
              size="small"
              variant="outlined"
            />
          </Box>
          <Box flexGrow={1}>
            <Divider />
          </Box>
        </Box>
      )}
      <Box mt={isSameUserSameTime ? 0 : 1} display="flex" flexDirection="row">
        <Box mr={1}>
          {!isSameUserSameTime ? (
            <Avatar className={materialClasses.userAvatar}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Box width={40} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" flexWrap="wrap">
          {!isSameUserSameTime && (
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
          )}
          <Box display="block" mt={isSameUserSameTime ? 0 : 0.5}>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <Typography style={{ wordBreak: 'break-all' }}>
                {message.message}
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

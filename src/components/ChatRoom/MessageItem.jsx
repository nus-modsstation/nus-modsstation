import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { findUserById } from '../../services/users.js';
import { formatMessageTime, formatDate } from '../../utils/formatDate';
import { updateReactChatMessage } from '../../services/messages';

import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Divider } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const messageStyles = makeStyles({
  msgText: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
  },
  paragraph: {
    marginBottom: 0,
  },
  upvoteButton: {
    '&$upvotedButton': {
      color: '#421cf8',
    },
  },
  upvotedButton: {},
  downvoteButton: {
    '&$downvotedButton': {
      color: '#421cf8',
    },
  },
  downvotedButton: {},
});

export const MessageItem = ({
  roomId,
  message,
  previousMessage,
  currentUser,
  threadRoom,
}) => {
  const messageClasses = messageStyles();
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
    let isMounted = true; // denote mount status
    const getUser = async () => {
      const result = await findUserById(message.userId);
      if (isMounted) {
        // prevent setUser when component unmount
        setUser(result);
      }
    };
    getUser();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
    // eslint-disable-next-line
  }, []);

  // backwards compatibility
  //====================================================================
  const hasUpvoted =
    message.userReactions && message.userReactions[currentUser.id]
      ? message.userReactions[currentUser.id] === 1
      : false;
  const hasDownvoted =
    message.userReactions && message.userReactions[currentUser.id]
      ? message.userReactions[currentUser.id] === -1
      : false;
  const initialCount =
    message.upvoteCount !== null
      ? message.upvoteCount - message.downvoteCount
      : 0;
  //====================================================================

  const [upvoted, setUpvoted] = useState(hasUpvoted);
  const [downvoted, setDownvoted] = useState(hasDownvoted);
  const [upvotes, setUpvotes] = useState(initialCount);
  const upvote = () => {
    if (currentUser && message.upvoteCount !== null) {
      const updateData = {
        userId: currentUser.id,
        reaction: 1,
      };
      updateReactChatMessage(roomId, message.id, updateData);
      setUpvoted(true);
      setUpvotes(downvoted ? upvotes + 2 : upvotes + 1);
      setDownvoted(false);
    }
  };
  const downvote = () => {
    if (currentUser && message.upvoteCount !== null) {
      const updateData = {
        userId: currentUser.id,
        reaction: -1,
      };
      updateReactChatMessage(roomId, message.id, updateData);
      setDownvoted(true);
      setUpvotes(upvoted ? upvotes - 2 : upvotes - 1);
      setUpvoted(false);
    }
  };

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
        <Box mt={1} mr={1}>
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
            <Box mt={1} display="flex" flexDirection="row">
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
          <Box display="block" mt={isSameUserSameTime ? 0 : 0.5} pr={1}>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              <ReactMarkdown
                className={messageClasses.msgText}
                renderers={{ paragraph: messageClasses.paragraph }}
                source={message.message}
              />
            </div>
          </Box>
          {threadRoom && (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              m="8px 2px 2px 2px"
            >
              {message.type !== '' && (
                <Box mr={1}>
                  <Chip
                    size="small"
                    variant="outlined"
                    label={message.type}
                    color={
                      message.type === 'question' ? 'primary' : 'secondary'
                    }
                  />
                </Box>
              )}
              <IconButton
                size="small"
                style={{ fontSize: 18 }}
                classes={{
                  root: messageClasses.upvoteButton,
                  disabled: messageClasses.upvotedButton,
                }}
                disabled={upvoted}
                onClick={upvote}
              >
                <ThumbUpIcon />
              </IconButton>
              <Box mx="4px">
                <Typography variant="caption">{upvotes}</Typography>
              </Box>
              <IconButton
                size="small"
                style={{ fontSize: 18 }}
                disabled={downvoted}
                classes={{
                  root: messageClasses.downvoteButton,
                  disabled: messageClasses.downvotedButton,
                }}
                onClick={downvote}
              >
                <ThumbDownIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

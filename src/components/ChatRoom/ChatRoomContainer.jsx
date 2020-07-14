import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
  listenOnMessageAdded,
  writeChatMessages,
  readRecentMessages,
  cancelOnMessageAdded,
} from '../../services/messages';

import { MessageItem } from '../../components/ChatRoom/MessageItem';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { CustomAlert } from '../shared/CustomAlert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

export const ChatRoomContainer = ({ roomId, user }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState(false);
  const [noMoreMessage, setNoMoreMessage] = useState(false);
  const [previousMessage, setPreviousMessage] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  const lastMessageRef = useRef(null);

  const scrollToBottom = ({ behavior }) => {
    if (lastMessageRef.current !== null) {
      lastMessageRef.current.scrollIntoView({ behavior: behavior });
    }
  };

  // handle onScroll event
  const handleScroll = (event) => {
    const target = event.target;
    // fetch previous messages when scroll to top
    if (target.scrollTop === 0 && !noMoreMessage) {
      setLoading(true);
      readRecentMessages({
        id: roomId,
        previousKey: previousMessage.id,
        previousTimestamp: previousMessage.timestamp,
        callback: (snapshot) => {
          if (snapshot.val() !== null) {
            const messageData = Object.values(snapshot.val());
            // delete the last message from messageData
            // as it is the previous message before fetching
            messageData.pop();
            setLoading(false);
            setMessages([...messageData, ...messages]);
            // set the first message as the previous message for pagination
            setPreviousMessage(messageData[0]);
            // if read message < 10, then no more messages
            if (messageData.length < 10) {
              setNoMoreMessage(true);
            }
          } else {
            setLoading(false);
            setMessages([]);
          }
        },
      });
    }
  };

  // trigger when roomId changes
  useEffect(() => {
    setMessages([]);
    setEmptyMessage(false);
    setLoading(true);
    setNoMoreMessage(false);
    readRecentMessages({
      id: roomId,
      callback: (snapshot) => {
        let messageData = [];
        if (snapshot.val() !== null) {
          messageData = Object.values(snapshot.val());
          setLoading(false);
          setMessages(messageData);
          // set the first message as the previous message for pagination
          setPreviousMessage(messageData[0]);
          // if read message < 10, then no more messages
          if (messageData.length < 10) {
            setNoMoreMessage(true);
          }
          scrollToBottom({ behavior: 'auto' });
        } else {
          setLoading(false);
          setMessages([]);
          setEmptyMessage(true);
          setNoMoreMessage(true);
        }
      },
    });
    // eslint-disable-next-line
  }, [roomId]);

  // trigger when emptyMessage change
  useEffect(() => {
    // only listen for the first message of the chat room
    if (emptyMessage) {
      listenOnMessageAdded({
        id: roomId,
        callback: (snapshot) => {
          const newMessage = snapshot.val();
          const updatedData = [...messages, newMessage];
          setMessages(updatedData);
          // scroll to bottom when new message arrives
          scrollToBottom({ behavior: 'auto' });
        },
      });
    }
    // eslint-disable-next-line
  }, [emptyMessage]);

  // trigger when messages change
  useEffect(() => {
    // cancel previous listener on message added
    // to avoid multiple listeners to update the messages
    cancelOnMessageAdded({ id: roomId });
    let initialRead = true;
    listenOnMessageAdded({
      id: roomId,
      callback: (snapshot) => {
        if (!initialRead) {
          const newMessage = snapshot.val();
          const updatedData = [...messages, newMessage];
          setMessages(updatedData);
          // scroll to bottom when new message arrives
          scrollToBottom({ behavior: 'auto' });
        } else {
          initialRead = false;
        }
      },
    });
    // eslint-disable-next-line
  }, [messages]);

  const onSubmit = (data) => {
    const newMessage = data.newMessage.trim();
    if (newMessage !== '') {
      writeChatMessages({
        id: roomId,
        userId: user.id,
        message: newMessage,
      });
      reset();
    }
  };

  return (
    <Box
      pt={1}
      height="76vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
    >
      {loading && (
        <CircularProgress color="secondary" size={32} thickness={4.5} />
      )}
      {!loading && messages.length === 0 && (
        <Box width={1}>
          <CustomAlert
            severity="info"
            alertTitle="No message yet"
            alertText="Be the first member to break the ice :)"
          />
        </Box>
      )}
      <Box
        width={1}
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        style={{ overflowY: 'hidden' }}
      >
        <Box
          onScroll={handleScroll}
          style={{ height: 'auto', overflowY: 'scroll' }}
        >
          {noMoreMessage && messages.length !== 0 && (
            <Box display="flex" justifyContent="center" width={1}>
              <Typography variant="caption">All messages are shown</Typography>
            </Box>
          )}
          {messages.map((message, index) => (
            <Box key={message.id}>
              {!noMoreMessage && !loading && index === 0 && (
                <Box display="flex" justifyContent="center" width={1}>
                  <Typography variant="caption" align="center">
                    Scroll up for previous messages
                  </Typography>
                </Box>
              )}
              <MessageItem
                message={message}
                previousMessage={index === 0 ? null : messages[index - 1]}
                isLast={index === messages.length - 1}
              />
              {index === messages.length - 1 && <div ref={lastMessageRef} />}
            </Box>
          ))}
        </Box>
      </Box>
      <Box width={1} mt={2}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            inputRef={register}
            name="newMessage"
            label="Messages"
            style={{ zIndex: 0 }}
            multiline
            rows={1}
            rowsMax={1}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    aria-label="send message"
                    edge="end"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </Box>
  );
};

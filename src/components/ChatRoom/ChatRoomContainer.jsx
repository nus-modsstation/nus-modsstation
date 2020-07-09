import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { listenChatMessages, writeChatMessages } from '../../services/messages';

import { MessageItem } from '../../components/ChatRoom/MessageItem';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { CustomAlert } from '../shared/CustomAlert';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ChatRoomContainer = ({ roomId, user }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    listenChatMessages({
      id: roomId,
      callback: (snapshot) => {
        if (snapshot.val() !== null) {
          const data = Object.values(snapshot.val());
          setLoading(false);
          setMessages(data);
        } else {
          setLoading(false);
          setMessages([]);
        }
      },
    });
    // eslint-disable-next-line
  }, [roomId]);

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
      p={1}
      height="80vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
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
      >
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            previousMessage={index === 0 ? null : messages[index - 1]}
            isLast={index === messages.length - 1}
          />
        ))}
      </Box>
      <Box width={1} mt={2}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            inputRef={register}
            name="newMessage"
            label="Messages"
            placeholder="Messages"
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

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { listenChatMessages, writeChatMessages } from '../../services/messages';

import { MessageItem } from '../../components/ChatRoom/MessageItem';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export const ChatRoomContainer = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    listenChatMessages({
      callback: (snapshot) => {
        const data = Object.values(snapshot.val());
        setLoading(false);
        setMessages(data);
      },
    });
  }, []);

  const onSubmit = (data) => {
    console.log('onSubmit');
    const newMessage = data.newMessage.trim();
    console.log(newMessage);
    if (newMessage !== '') {
      console.log('message is sent');
      writeChatMessages({
        userId: user.id,
        message: newMessage,
      });
      reset();
    }
  };

  return (
    <Box>
      {loading && <div>Loading...</div>}
      <Box>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </Box>
      <Box mt={2}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            inputRef={register}
            name="newMessage"
            label="Messages"
            placeholder="Messages"
            multiline
            rowsMax={2}
            variant="outlined"
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

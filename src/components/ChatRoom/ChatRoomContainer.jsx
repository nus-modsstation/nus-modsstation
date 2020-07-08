import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { listenChatMessages, writeChatMessages } from '../../services/messages';

import { MessageItem } from '../../components/ChatRoom/MessageItem';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { CustomAlert } from '../shared/CustomAlert';

export const ChatRoomContainer = ({ roomData, user }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    listenChatMessages({
      id: roomData.id,
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
  }, []);

  const onSubmit = (data) => {
    const newMessage = data.newMessage.trim();
    if (newMessage !== '') {
      writeChatMessages({
        id: roomData.id,
        userId: user.id,
        message: newMessage,
      });
      reset();
    }
  };

  return (
    <Grid container>
      <Hidden xsDown>
        <Grid item md={4} sm={3}>
          <Box textOverflow="ellipsis">{roomData.id}</Box>
        </Grid>
      </Hidden>
      <Grid item md={8} sm={9} xs={12}>
        <Box
          height="75vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {loading && <div>Loading...</div>}
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
            alignItems
          >
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
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
                rowsMax={2}
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
      </Grid>
    </Grid>
  );
};

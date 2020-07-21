import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ChatRoomContainer } from './ChatRoomContainer';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { CustomAlert } from '../shared/CustomAlert';
import { Box } from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';

export const ChatRoomList = ({ id, user, roomData, removeRoom, starRoom }) => {
  const history = useHistory();
  const roomIds = roomData.map((room) => room.id);
  const [roomId, setRoomId] = useState(id === undefined ? roomIds[0] : id);
  const invalidId = !roomIds.includes(roomId);
  const [threadRoom, setThreadRoom] = useState(false);

  const handleSelectRoom = (event) => {
    history.push(`/chat-room/${event.target.value}`);
  };

  // trigger when id changes
  useEffect(() => {
    if (id !== undefined) {
      const getRoomData = roomData.filter((roomData) => roomData.id === id);
      const isThreadRoom =
        getRoomData[0] && getRoomData[0].type === 'qa-thread';
      setRoomId(id);
      setThreadRoom(isThreadRoom);
    }
  }, [id, roomData]);

  return (
    <Grid spacing={2} container>
      <Hidden xsDown>
        <Grid item md={3} sm={4}>
          <List>
            {roomData.map((room) => (
              <ListItem
                button
                component={Link}
                to={`/chat-room/${room.id}`}
                key={room.name}
                selected={roomId === room.id}
              >
                <ListItemIcon>
                  {room.type === 'study-group' ? (
                    <LocalLibraryIcon />
                  ) : room.type === 'virtual-group' ? (
                    <ContactMailIcon />
                  ) : (
                    <QuestionAnswerIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  <Typography noWrap>{room.name}</Typography>
                </ListItemText>
                {room.type === 'qa-thread' &&
                  !room.isOwner &&
                  (room.temp ? (
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => starRoom(room)}
                        to={'/chat-room'}
                      >
                        <StarIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  ) : (
                    <ListItemSecondaryAction>
                      <IconButton
                        component={Link}
                        onClick={() => removeRoom(room)}
                        to={'/chat-room'}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  ))}
              </ListItem>
            ))}
          </List>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <FormControl fullWidth style={{ width: '100%' }} variant="outlined">
            <InputLabel>Chat room</InputLabel>
            <Select
              SelectDisplayProps={{
                style: { display: 'flex', alignItems: 'center' },
              }}
              value={roomId}
              onChange={handleSelectRoom}
              label="Chat room"
            >
              {roomData.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  <ListItemIcon>
                    {room.type === 'study-group' ? (
                      <LocalLibraryIcon />
                    ) : room.type === 'virtual-group' ? (
                      <ContactMailIcon />
                    ) : (
                      <QuestionAnswerIcon />
                    )}
                  </ListItemIcon>
                  {room.name}
                  {room.type === 'qa-thread' && !room.isOwner && (
                    <ListItemSecondaryAction>
                      <IconButton
                        component={Link}
                        onClick={() => removeRoom(room)}
                        to={'/chat-room'}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Hidden>
      <Grid item md={9} sm={8} xs={12}>
        <Box width={1}>
          {user === null ? (
            <CustomAlert
              severity="info"
              alertTitle="You are not logged in"
              alertText="Please log in to your account on "
              route="/login"
              pageName="Login page"
            />
          ) : invalidId ? (
            <CustomAlert
              severity="info"
              alertTitle="You don't have any chat room"
              alertText="Please join a study group/virtual group/Q&A thread first"
            />
          ) : (
            <ChatRoomContainer
              roomId={roomId}
              threadRoom={threadRoom}
              user={user}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

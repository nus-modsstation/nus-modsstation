import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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

export const ChatRoomList = ({ id, user, roomData }) => {
  const history = useHistory();
  const roomIds = roomData.map((room) => room.id);
  const [roomId, setRoomId] = useState(id === undefined ? roomIds[0] : id);
  const invalidId = !roomIds.includes(roomId);

  const handleSelectRoom = (event) => {
    history.push(`/chat-room/${event.target.value}`);
  };

  useEffect(() => {
    if (id !== undefined) {
      setRoomId(id);
    }
  }, [id]);

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
              </ListItem>
            ))}
          </List>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <FormControl fullWidth style={{ width: '100%' }} variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Chat room
            </InputLabel>
            <Select
              SelectDisplayProps={{
                style: { display: 'flex', alignItems: 'center' },
              }}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
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
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Hidden>
      <Grid item md={9} sm={8} xs={12}>
        {invalidId ? (
          <Box width={1}>
            <CustomAlert
              severity="warning"
              alertTitle="Chat room not found"
              alertText="Please select one of your chat room"
            />
          </Box>
        ) : (
          <ChatRoomContainer roomId={roomId} user={user} />
        )}
      </Grid>
    </Grid>
  );
};

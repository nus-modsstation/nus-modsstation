import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ChatRoomContainer } from './ChatRoomContainer';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { CustomAlert } from '../shared/CustomAlert';
import { Box } from '@material-ui/core';

export const ChatRoomList = ({ id, user, roomNames, roomIds }) => {
  const [roomId, setRoomId] = useState(id === undefined ? roomIds[0] : id);
  const invalidId = !roomIds.includes(roomId);

  useEffect(() => {
    if (id !== undefined) {
      setRoomId(id);
    }
  }, [id]);

  return (
    <Grid spacing={2} container>
      <Hidden xsDown>
        <Grid item md={4} sm={3}>
          <List>
            {roomNames.map((name, index) => (
              <ListItem
                button
                component={Link}
                to={`/chat-room/${roomIds[index]}`}
                key={name}
                selected={roomId === roomIds[index]}
              >
                <ListItemIcon>
                  <LocalLibraryIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Hidden>
      <Grid item md={8} sm={9} xs={12}>
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

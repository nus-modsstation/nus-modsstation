import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Chat from '@material-ui/icons/Chat';
import PersonAdd from '@material-ui/icons/PersonAdd';

//import { readDocument } from '../../services/firestore';

export const VirtualGroupInfo = ({ currentUser, groupData }) => {
  /*
  let groupMembers = groupData.users.map(async (id) => {
    const result = await readDocument({ collection: 'users', docId: id });
    return result;
  });

  console.log(groupMembers);
  */

  return (
    <Box m="10px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  flex="none"
                  width="75px"
                  height="75px"
                  mr="15px"
                />
                <Typography variant="h5" noWrap>
                  {groupData.groupName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">About the group</Typography>
              <Box pt="15px" overflow="auto">
                <Typography variant="body1" paragraph>
                  {groupData.description
                    ? groupData.description
                    : "The whereabouts of the group's description remains a mystery to this day."}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={10}>
                Members
              </Typography>
              <List>
                {groupData.users.map((userId, index) => (
                  <ListItem disableGutters key={index}>
                    <Typography variant="body1" noWrap>
                      {userId}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          {currentUser ? (
            groupData.users.find((userId) => currentUser.id === userId) ? (
              <List disablePadding>
                <ListItem button mb="10px" alignItems="center">
                  <Box mr="10px">
                    <Chat fontSize="small" />
                  </Box>
                  <Typography variant="subtitle2">Chat room</Typography>
                </ListItem>
                <ListItem button mb="10px" alignItems="center">
                  <Box mr="10px">
                    <PersonAdd fontSize="small" />
                  </Box>
                  <Typography variant="subtitle2">Add friend</Typography>
                </ListItem>
                <ListItem button mb="10px" alignItems="center">
                  <Typography color="error" variant="subtitle2">
                    Leave group
                  </Typography>
                </ListItem>
              </List>
            ) : (
              <Button variant="contained" fullWidth>
                Join
              </Button>
            )
          ) : (
            <Button variant="contained" fullWidth disabled>
              Join
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

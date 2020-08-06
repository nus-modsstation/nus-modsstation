import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EmailIcon from '@material-ui/icons/Email';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const FriendsList = ({ isSearch, friendsData }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <List dense className={classes.root}>
      {friendsData && friendsData.length > 0 ? (
        friendsData.map((friend) => {
          return (
            <ListItem key={friend.email} button>
              <ListItemAvatar>
                <Avatar>{friend.username.charAt(0).toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${friend.username}`} />
              <ListItemSecondaryAction>
                {isSearch ? (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PersonAddIcon style={{ color: '#009688' }} />}
                  >
                    {!isXs && <span style={{ color: '#009688' }}>Add</span>}
                  </Button>
                ) : (
                  <ButtonGroup>
                    <Button
                      size="small"
                      startIcon={<EmailIcon style={{ color: '#421cf8' }} />}
                    >
                      {!isXs && <span style={{ color: '#421cf8' }}>Chat</span>}
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon style={{ color: '#f44336' }} />}
                    >
                      {!isXs && (
                        <span style={{ color: '#f44336' }}>Remove</span>
                      )}
                    </Button>
                  </ButtonGroup>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      ) : (
        <Box>No data</Box>
      )}
    </List>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const componentStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .4)',
    borderRadius: 5,
  },
});

const Thread = ({ thread }) => {
  return (
    <div>
      <ListItem button component={Link} to={`chat-room/${thread.id}`}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="body1" noWrap>
              {thread.taskName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" maxWidth={1} justifyContent="flex-end">
              <Typography variant="button" align="right">
                {thread.moduleCode}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export const YourQAThreadSmall = ({ myThreads }) => {
  const component = componentStyles();
  return (
    <div>
      <List width={1} className={component.root}>
        {myThreads.map((thread, index) => (
          <Thread key={index} thread={thread} />
        ))}
      </List>
    </div>
  );
};

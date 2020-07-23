import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const componentStyles = makeStyles({
  card: {
    padding: 16,
    // orange: QA threads
    backgroundColor: 'rgba(250, 190, 88, 0.3)',
  },
});

export const YourQAThread = ({ thread }) => {
  const componentClasses = componentStyles();

  return (
    <Box
      component={Paper}
      className={componentClasses.card}
      mb="5px"
      height={0.45}
      width={1}
    >
      <Box width={1}>
        <Typography variant="button">{thread.moduleCode}</Typography>
      </Box>
      <Grid
        container
        spacing={1}
        m="5px"
        p="5px"
        display="flex"
        justify="space-between"
        alignItems="center"
        width={1}
      >
        <Grid item md={9}>
          <Typography component="p" variant="body1">
            {thread.taskName}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Button component={Link} to={`chat-room/${thread.id}`} size="small">
            <Typography variant="button">View</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card, CardActions } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

const componentStyles = makeStyles({
  card: {
    height: 200,
    width: 175,
    marginRight: 25,
  },
  cardContent: {
    margin: 8,
    overflow: 'hidden',
    padding: 8,
  },
  listItem: {
    marginBottom: 10,
    padding: 8,
  },
  listItemContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const ThreadPortraitCard = ({ thread }) => {
  const componentClasses = componentStyles();
  return (
    <Card variant="outlined" className={componentClasses.card}>
      <Box
        width={1}
        className={componentClasses.cardContent}
        height={0.65}
        m="5px"
      >
        <Box textOverflow="ellipsis">
          <Typography variant="body1">{thread.taskName}</Typography>
        </Box>
        <Box overflow="hidden">
          <Typography component="p" variant="caption">
            Current question
          </Typography>
        </Box>
      </Box>
      <CardActions disableSpacing>
        <Button fullWidth>View</Button>
      </CardActions>
    </Card>
  );
};

const ThreadLandscapeCard = ({ thread }) => {
  const componentClasses = componentStyles();
  return (
    <Box component={Paper} className={componentClasses.listItem}>
      <Grid container alignItems="center" spacing={1} justify="space-between">
        <Grid item xs={8} md={9}>
          <Box width={1} className={componentClasses.listItemContent}>
            <Box width={1}>
              <Typography variant="body1">{thread.taskName}</Typography>
            </Box>
            <Box width={1}>
              <Typography variant="caption" component="p">
                Active questions: ...
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} md={1}>
          <Button size="small" fullWidth>
            View
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const QAThreadCard = ({ modulePage, thread }) => {
  return (
    <div>
      {modulePage ? (
        <ThreadLandscapeCard thread={thread} />
      ) : (
        <ThreadPortraitCard thread={thread} />
      )}
    </div>
  );
};

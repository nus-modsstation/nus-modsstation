import React from 'react';

import { upcomingGroupData } from '../../models/StudyGroup';
import { formatDateTime } from '../../utils/formatDate';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

export const UpcomingGroupList = () => {
  return (
    <List>
      {upcomingGroupData.map((group, index) => (
        <Box key={index}>
          <ListItem>
            <Grid container alignItems="center" spacing={1}>
              <Grid xs={12} item>
                <Typography variant="body1" color="textPrimary">
                  {formatDateTime(group.time)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textPrimary">
                  {group.groupTitle}
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={group.module}
                  size="small"
                />
              </Grid>
              <Grid item>
                <Chip
                  color="secondary"
                  variant="outlined"
                  label={group.location}
                  size="small"
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
};

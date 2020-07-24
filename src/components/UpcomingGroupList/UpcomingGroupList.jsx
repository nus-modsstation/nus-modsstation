import React from 'react';

import { formatDateTime } from '../../utils/formatDate';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { materialStyles } from '../../styles/material.styles';

export const UpcomingGroupList = ({ data }) => {
  const materialClasses = materialStyles();
  return (
    <List dense>
      {data.map((group, index) => (
        <Box key={index}>
          <ListItem disableGutters>
            <Paper
              style={{
                backgroundColor: 'rgba(30, 130, 76, 0.3)',
              }}
              className={materialClasses.paper}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid xs={12} item>
                  <Typography variant="body2" color="textPrimary">
                    {formatDateTime(group.startTime)}
                  </Typography>
                </Grid>
                <Grid xs={12} item>
                  <Typography variant="body1" color="textPrimary">
                    {group.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip
                    icon={<ImportContactsIcon />}
                    variant="outlined"
                    label={group.moduleCode}
                    size="small"
                  />
                </Grid>
                <Grid item>
                  <Chip
                    className={materialClasses.chipStyle}
                    size="small"
                    icon={<LocationOnIcon />}
                    //color="secondary"
                    variant="outlined"
                    label={group.location}
                  />
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};

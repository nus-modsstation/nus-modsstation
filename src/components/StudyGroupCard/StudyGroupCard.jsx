import React from 'react';

import { formatTime } from '../../utils/formatDate';

import Paper from '@material-ui/core/Paper';
import { Typography, Box, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';

export const StudyGroupCard = ({ studyGroup }) => {
  const chipStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '6px',
    paddingRight: '6px',
  };

  return (
    <Box>
      <Paper variant="outlined">
        <Box pt={2} pl={2} pr={2}>
          <Typography noWrap variant="body1">
            {studyGroup.title}
          </Typography>
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<ImportContactsIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            color="primary"
            variant="outlined"
            label={studyGroup.moduleCode}
          />
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<LocationOnIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            color="secondary"
            variant="outlined"
            label={studyGroup.location}
          />
          <Box mt={2} />
          <Chip
            style={chipStyle}
            icon={<TodayIcon />}
            onClick={() => {
              console.log('clicked');
            }}
            variant="outlined"
            label={formatTime(studyGroup.startTime, studyGroup.endTime)}
          />
          <Box mt={1} />
          <Button size="large" fullWidth>
            Join
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

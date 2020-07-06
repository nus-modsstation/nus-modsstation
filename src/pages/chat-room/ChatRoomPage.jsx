import React from 'react';

import { materialStyles } from '../../styles/material.styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

export const ChatRoomPage = ({ user }) => {
  const materialClasses = materialStyles();

  return (
    <Box className={materialClasses.root}>
      <Typography>Chat room</Typography>
    </Box>
  );
};

import React from 'react';

import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

export const ErrorMessage = ({ errorMessage }) => {
  return (
    <Box display="flex" alignItems="center">
      <WarningIcon color="error" />
      <Box m={0.5} />
      <Typography color="error" variant="caption">
        {errorMessage}
      </Typography>
    </Box>
  );
};

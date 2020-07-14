import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

export const CustomAlert = ({
  severity,
  alertTitle,
  alertText,
  route,
  pageName,
}) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{alertTitle}</AlertTitle>
      {alertText}
      {route && pageName && (
        <Typography
          style={{ textDecoration: 'none' }}
          to={route}
          component={Link}
        >
          <strong>{pageName}</strong>
        </Typography>
      )}
    </Alert>
  );
};

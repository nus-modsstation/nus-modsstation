import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';

const componentStyles = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
    paddingBottom: 5,
  },
  groupPicture: {},
  itemContent: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
    marginLeft: 5,
    paddingBottom: 5,
  },
});

export const VirtualGroupCardModule = () => {
  const component = componentStyles();
  return (
    <Box width={1} height={1 / 4} className={component.item}>
      <Box height={1} width={120} className={component.groupPicture}></Box>
      <Box
        height={1}
        display="flex"
        flexDirection="column"
        className={component.itemContent}
      >
        <Typography align="left" variant="body1">
          Group Name
        </Typography>
        <Typography align="left" variant="caption">
          Group description
        </Typography>
        <Typography align="left" variant="overline">
          4 members
        </Typography>
        <Typography
          component={Button}
          size="small"
          align="center"
          variant="button"
        >
          Join
        </Typography>
      </Box>
    </Box>
  );
};

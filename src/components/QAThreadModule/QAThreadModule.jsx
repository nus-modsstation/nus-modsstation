import React from 'react';
// import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { QAThreadCard } from '../../components/QAThreadCard/QAThreadCard';

const componentStyles = makeStyles({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemContent: {
    margin: '10px 0px',
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      borderRadius: 8,
      background: '#421cf8',
    },
  },
});

export const QAThreadModule = ({ moduleCode, threads, currentUser }) => {
  const componentClasses = componentStyles();

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      width={1}
      maxHeight={0.65}
      alignItems="flex-start"
      className={componentClasses.item}
    >
      <Box width={1} className={componentClasses.itemHeader}>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <Button /*component={NavLink} to="/qa-thread-module"*/>
          <Typography variant="body1">{moduleCode}</Typography>
        </Button>
      </Box>
      <Box width={1}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box overflow="auto" className={componentClasses.itemContent}>
            {threads && threads.length > 0 ? (
              threads.map((thread, index) => (
                <QAThreadCard
                  key={index}
                  thread={thread}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <Box width={1}>
                <Alert severity="info">
                  Looks like there is no any Q&A thread yet...
                </Alert>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

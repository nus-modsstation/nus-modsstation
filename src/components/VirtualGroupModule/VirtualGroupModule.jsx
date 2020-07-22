import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { VirtualGroupCard } from '../../components/VirtualGroupCard/VirtualGroupCard';

const componentStyles = makeStyles({
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemHeader: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  itemHeaderLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemContent: {
    marginTop: '10px',
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
      backgroundColor: '#616161',
    },
  },
});

export const VirtualGroupModule = ({ currentUser, moduleCode, groups }) => {
  const recruitingGroups = groups
    ? groups.filter((group) => group.isPublic)
    : [];
  const component = componentStyles();

  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      className={component.item}
      width={1}
      maxHeight={0.5}
      alignItems="flex-start"
    >
      <div className={component.itemHeader}>
        <div className={component.itemHeaderLeft}>
          <IconButton onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Button component={NavLink} to={`virtual-group/${moduleCode}`}>
            <Typography variant="body1">{moduleCode}</Typography>
          </Button>
        </div>
      </div>
      <Box width={1}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box overflow="auto" className={component.itemContent}>
            {groups && recruitingGroups.length > 0 ? (
              recruitingGroups.map((group, index) => (
                <VirtualGroupCard
                  currentUser={currentUser}
                  key={index}
                  groupData={group}
                />
              ))
            ) : (
              <Box width={1}>
                <Alert severity="info">
                  No activity detected on this Module :(
                </Alert>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

import React from 'react';

import { capSentence } from '../../utils/formatString';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StudyGroupCard } from '../StudyGroupCard/StudyGroupCard';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import { useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '100%',
  },
  sectionContent: {
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
      background: 'gray',
    },
  },
});

export const StudyGroupSection = ({ sectionTitle, sectionData, hideJoin }) => {
  const classes = useStyles();

  return (
    <Box width={1}>
      <Box mt={2} />
      <Typography variant="h6">{capSentence(sectionTitle)}</Typography>
      <Box mt={2} />
      <Box width={1} className={classes.root}>
        {sectionData && sectionData.length > 0 ? (
          <Box overflow="auto" className={classes.sectionContent}>
            {sectionData.map((studyGroup, index) => (
              <StudyGroupCard
                key={index}
                studyGroup={studyGroup}
                hideJoin={hideJoin}
              />
            ))}
          </Box>
        ) : (
          <Box width={1}>
            <Alert severity="info">
              No activity detected on this Module :(
            </Alert>
          </Box>
        )}
      </Box>
    </Box>
  );
};

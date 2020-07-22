import React from 'react';

import { capSentence } from '../../utils/formatString';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, GridListTile } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StudyGroupCard } from '../StudyGroupCard/StudyGroupCard';
import GridList from '@material-ui/core/GridList';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
});

export const StudyGroupSection = ({ sectionTitle, sectionData, hideJoin }) => {
  const classes = useStyles();

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));

  const colWidth = xs ? 1.7 : sm ? 3.7 : md ? 3.3 : lg ? 4.5 : 5.2;

  return (
    <Box>
      <Box mt={2} />
      <Typography variant="h6">{capSentence(sectionTitle)}</Typography>
      <Box mt={2} />
      <Box className={classes.root}>
        {sectionData && sectionData.length > 0 ? (
          <GridList
            className={classes.gridList}
            cellHeight="auto"
            cols={colWidth}
            spacing={16}
          >
            {sectionData.map((studyGroup, index) => (
              <GridListTile key={index}>
                <StudyGroupCard
                  key={index}
                  studyGroup={studyGroup}
                  hideJoin={hideJoin}
                />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <Box width={1}>
            <Alert severity="info">
              Looks like there is no any study group yet...
            </Alert>
          </Box>
        )}
      </Box>
    </Box>
  );
};

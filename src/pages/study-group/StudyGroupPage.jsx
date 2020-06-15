import React from 'react';

import { StudyGroup, sections } from '../../models/StudyGroup';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { UpcomingGroupList } from '../../components/UpcomingGroupList/UpcomingGroupList';
import { StudyGroupSection } from '../../components/StudyGroupSection/StudyGroupSection';

export const StudyGroupPage = () => {
  const materialClasses = materialStyles();

  return (
    <Box className={materialClasses.root}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid xs={12} item>
              <Searchbar searchOptions={StudyGroup.searchOptions} />
            </Grid>
            {sections.map((section, index) => (
              <Grid xs={12} key={index} item>
                <StudyGroupSection
                  sectionTitle={section.title}
                  sectionData={section.data}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid md={4} item>
            <Box pl={4}>
              <Paper className={materialClasses.paper}>
                <Typography variant="h6">Upcoming study groups</Typography>
                <UpcomingGroupList />
              </Paper>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

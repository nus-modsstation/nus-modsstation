import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { modules } from '../../models/Module';
import { StudyGroup } from '../../models/StudyGroup';
import {
  selectMyGroups,
  selectStudyGroupsByModule,
} from '../../redux/studyGroup/studyGroup.selector';
import {
  readMyGroups,
  readGroupsByModule,
} from '../../redux/studyGroup/studyGroup.action';
import { selectCurrentUser } from '../../redux/user/user.selector';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { materialStyles } from '../../styles/material.styles';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { UpcomingGroupList } from '../../components/UpcomingGroupList/UpcomingGroupList';
import { StudyGroupSection } from '../../components/StudyGroupSection/StudyGroupSection';
import { StudyGroupDialog } from '../../components/StudyGroupDialog/StudyGroupDialog';

const StudyGroupPageComponent = ({
  myGroups,
  currentUser,
  readMyGroups,
  readGroupsByModule,
  studyGroupsByModule,
}) => {
  const materialClasses = materialStyles();

  useEffect(() => {
    // fetch my, live and module-specific study groups
    // call this when variables change by providing the varaibles in the second argument
    // this behaves like componentDidMount
    modules.forEach((module) => {
      readGroupsByModule(module.id);
    });
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
    }
  }, [currentUser, readGroupsByModule, readMyGroups]);

  return (
    <Box className={materialClasses.root}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid xs={12} item>
              <Grid container spacing={1} alignItems="center">
                <Grid xs={9} sm={10} md={11} item>
                  <Searchbar searchOptions={StudyGroup.searchOptions} />
                </Grid>
                <Grid xs={3} sm={2} md={1} item>
                  <Grid justify="center" container>
                    <Grid item>
                      <StudyGroupDialog />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {myGroups.length > 0 && (
              <Grid xs={12} item>
                <StudyGroupSection
                  sectionTitle="My groups"
                  sectionData={myGroups}
                />
              </Grid>
            )}
            {modules.map((module, index) => (
              <Grid xs={12} key={index} item>
                <StudyGroupSection
                  sectionTitle={module.id}
                  sectionData={studyGroupsByModule(module.id)}
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
                <UpcomingGroupList data={myGroups} />
              </Paper>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  myGroups: selectMyGroups(state),
  currentUser: selectCurrentUser(state),
  studyGroupsByModule: (moduleCode) =>
    selectStudyGroupsByModule(moduleCode)(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyGroups: (userId) => dispatch(readMyGroups(userId)),
  readGroupsByModule: (moduleCode) => dispatch(readGroupsByModule(moduleCode)),
});

export const StudyGroupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupPageComponent);

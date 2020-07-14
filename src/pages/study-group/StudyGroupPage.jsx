import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { StudyGroup } from '../../models/StudyGroup';
import {
  selectMyGroups,
  selectStudyGroupsByModule,
  selectSearchResults,
} from '../../redux/studyGroup/studyGroup.selector';
import {
  readMyGroups,
  readGroupsByModule,
  searchGroupStart,
  filterSearchResults,
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
import { CustomAlert } from '../../components/shared/CustomAlert';

const StudyGroupPageComponent = ({
  myGroups,
  currentUser,
  readMyGroups,
  readGroupsByModule,
  studyGroupsByModule,
  searchResults,
  searchGroupStart,
  filterSearchResults,
}) => {
  const materialClasses = materialStyles();

  useEffect(() => {
    // fetch my, live and module-specific study groups
    // call this when variables change by providing the varaibles in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
      currentUser.modules.forEach((moduleCode) =>
        readGroupsByModule(moduleCode)
      );
    }
  }, [currentUser, readGroupsByModule, readMyGroups]);

  const [searchQueries, setSearchQueries] = useState([]);

  const searchCallback = (searchData) => {
    setSearchQueries(searchData.value);
    // extract modules and locations
    const moduleCodes = searchData.value
      .filter((query) => query.type === 'module')
      .map((result) => result.option);
    const locations = searchData.value
      .filter((query) => query.type === 'location')
      .map((result) => result.option);
    if (searchData.reason === 'select-option') {
      // perform search on Firestore
      // dispatch search action
      const queryData = {
        fieldName: 'moduleCode',
        fieldValue: moduleCodes,
      };
      // const queryData = {
      //   fieldNames: ['moduleCode', 'location'],
      //   fieldValues: [moduleCodes, locations],
      // };
      searchGroupStart(queryData);
    } else if (searchData.reason === 'remove-option') {
      // filter search results when option is removed
      const queryData = {
        locations,
        moduleCodes,
      };
      filterSearchResults(queryData);
    }
  };

  return (
    <Box className={materialClasses.root}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid xs={12} item>
              <Grid container spacing={1} alignItems="center">
                <Grid xs={9} sm={10} md={11} item>
                  <Searchbar
                    searchCallback={searchCallback}
                    searchOptions={StudyGroup.searchOptions}
                  />
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
            {currentUser == null && (
              <Grid xs={12} item>
                <Box mt={3} />
                <CustomAlert
                  severity="info"
                  alertTitle="You are not logged in"
                  alertText="Please log in to your account on "
                  route="/login"
                  pageName="Login page"
                />
              </Grid>
            )}
            {currentUser && currentUser.modules.length === 0 && (
              <Grid xs={12} item>
                <Box mt={3} />
                <CustomAlert
                  severity="info"
                  alertTitle="You don't have any modules"
                  alertText="Please add your modules on "
                  route="/dashboard"
                  pageName="Dashboard page"
                />
              </Grid>
            )}
            {searchQueries.length > 0 && (
              <Grid xs={12} item>
                <StudyGroupSection
                  sectionTitle={`Search results:${searchQueries.map(
                    (query) => ' ' + query.option
                  )}`}
                  sectionData={searchResults}
                />
              </Grid>
            )}
            {currentUser && myGroups.length > 0 && (
              <Grid xs={12} item>
                <StudyGroupSection
                  sectionTitle="My groups"
                  sectionData={myGroups}
                  hideJoin
                />
              </Grid>
            )}
            {currentUser &&
              currentUser.modules.map((moduleCode) => (
                <Grid xs={12} key={moduleCode} item>
                  <StudyGroupSection
                    sectionTitle={moduleCode}
                    sectionData={studyGroupsByModule(moduleCode)}
                    hideJoin={false}
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
  searchResults: selectSearchResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyGroups: (userId) => dispatch(readMyGroups(userId)),
  readGroupsByModule: (moduleCode) => dispatch(readGroupsByModule(moduleCode)),
  searchGroupStart: (queryData) => dispatch(searchGroupStart(queryData)),
  filterSearchResults: (queryData) => dispatch(filterSearchResults(queryData)),
});

export const StudyGroupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyGroupPageComponent);

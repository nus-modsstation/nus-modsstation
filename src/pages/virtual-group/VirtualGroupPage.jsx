import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { modules } from '../../models/Module';
import { VirtualGroup } from '../../models/VirtualGroup';
import {
  selectMyVirtualGroups,
  selectVirtualGroupsByModule,
} from '../../redux/virtualGroup/virtualGroup.selector';
import {
  readMyVirtualGroups,
  readVirtualGroupsByModule,
} from '../../redux/virtualGroup/virtualGroup.action';
import { selectCurrentUser } from '../../redux/user/user.selector';

import { makeStyles } from '@material-ui/core/styles';
import { materialStyles } from '../../styles/material.styles';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { YourGroupsSmall } from '../../components/YourVirtualGroupsSmall/YourVirtualGroupsSmall';
import { VirtualGroupModule } from '../../components/VirtualGroupModule/VirtualGroupModule';
import { YourGroupCard } from '../../components/YourVirtualGroupCard/YourVirtualGroupCard';
import { VirtualGroupDialog } from '../../components/VirtualGroupDialog/VirtualGroupDialog';
import { CustomAlert } from '../../components/shared/CustomAlert';

const recruitingGroupStyles = makeStyles({
  header: {
    margin: '10px 0px',
  },
  list: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const myGroupStyles = makeStyles({
  list: {
    height: 432,
    overflow: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const VirtualGroupPageComponent = ({
  myGroups,
  currentUser,
  readMyGroups,
  readGroupsByModule,
  virtualGroupsByModule,
}) => {
  const styles = materialStyles();
  const recruitingGroupsClasses = recruitingGroupStyles();
  const myGroupsClasses = myGroupStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchQueries, setSearchQueries] = React.useState(
    currentUser ? currentUser.modules : []
  );
  const userOptions = currentUser
    ? VirtualGroup.searchOptions.filter((item) =>
        currentUser.modules.includes(item.option)
      )
    : [];

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  // filter user modules by searchbar selection(s)
  const searchCallback = (searchData) => {
    if (searchData.value.length > 0) {
      const results = currentUser.modules.filter((moduleCode) =>
        searchData.value.map((module) => module.option).includes(moduleCode)
      );
      setSearchQueries(results);
    } else {
      setSearchQueries(currentUser.modules);
    }
  };

  useEffect(() => {
    // fetch recruiting groups by module and my groups
    // call this when variables change by providing the variables in the second argument
    // this behaves like componentDidMount
    modules.forEach((module) => {
      readGroupsByModule(module.id);
    });
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
    }
  }, [currentUser, readGroupsByModule, readMyGroups]);

  return (
    <Box className={styles.root}>
      <Grid container spacing={4} justify="space-between">
        <Grid item md={9} xs={12}>
          <Hidden mdUp>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
              <YourGroupsSmall
                currentUser={currentUser}
                yourGroups={myGroups}
              />
            </Popper>
          </Hidden>
          <Hidden mdUp>
            <Box my="4px">
              <Button
                onClick={handleClick}
                variant="outlined"
                fullWidth
                size="small"
              >
                <Typography variant="button">Your groups</Typography>
              </Button>
            </Box>
          </Hidden>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={10} md={11}>
              <Searchbar
                searchOptions={userOptions}
                searchCallback={searchCallback}
              />
            </Grid>
            <Grid item xs={2} md={1}>
              <VirtualGroupDialog />
            </Grid>
          </Grid>
          {currentUser === null && (
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
          {currentUser &&
            (currentUser.modules.length === 0 ? (
              <Box mt={3}>
                <CustomAlert
                  severity="info"
                  alertTitle="You don't have any modules"
                  alertText="Please add your modules on "
                  route="/dashboard"
                  pageName="Dashboard page"
                />
              </Box>
            ) : (
              <Box className={recruitingGroupsClasses.list} width={1}>
                {searchQueries.map((moduleCode, index) => (
                  <VirtualGroupModule
                    currentUser={currentUser}
                    moduleCode={moduleCode}
                    key={index}
                    groups={virtualGroupsByModule(moduleCode)}
                  />
                ))}
              </Box>
            ))}
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box my="8px">
              <Typography variant="h6" align="center">
                My groups
              </Typography>
            </Box>
            <Box width={1} className={myGroupsClasses.list}>
              {currentUser &&
                myGroups.map((virtualGroup, index) => (
                  <YourGroupCard
                    currentUser={currentUser}
                    groupData={virtualGroup}
                    key={index}
                  />
                ))}
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  myGroups: selectMyVirtualGroups(state),
  currentUser: selectCurrentUser(state),
  virtualGroupsByModule: (moduleCode) =>
    selectVirtualGroupsByModule(moduleCode)(state),
});

const mapDispatchToProps = (dispatch) => ({
  readMyGroups: (userId) => dispatch(readMyVirtualGroups(userId)),
  readGroupsByModule: (moduleCode) =>
    dispatch(readVirtualGroupsByModule(moduleCode)),
});

export const VirtualGroupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupPageComponent);

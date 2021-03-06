import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
  },
});

const myGroupStyles = makeStyles({
  list: {
    height: 432,
    overflow: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      borderRadius: 8,
      backgroundColor: 'gray',
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
  const realUserModules = currentUser
    ? currentUser.modules.filter((moduleCode) => moduleCode !== 'MOD1001')
    : [];
  const [searchQueries, setSearchQueries] = React.useState(
    currentUser ? realUserModules : []
  );

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  // filter user modules by searchbar selection(s)
  const searchCallback = (searchData) => {
    if (searchData.value) {
      const results = realUserModules.filter(
        (moduleCode) => moduleCode === searchData.value.moduleCode
      );
      setSearchQueries(results);
    } else {
      setSearchQueries(realUserModules);
    }
  };

  useEffect(() => {
    // fetch recruiting groups by module and my groups
    // call this when variables change by providing the variables in the second argument
    // this behaves like componentDidMount
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
      currentUser.modules.forEach((moduleCode) => {
        readGroupsByModule(moduleCode);
      });
    }
  }, [currentUser, readGroupsByModule, readMyGroups]);

  return (
    <Box className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9}>
          <Hidden mdUp>
            <Popper
              open={open}
              style={{ width: '94%' }}
              anchorEl={anchorEl}
              placement="bottom"
            >
              {currentUser && (
                <YourGroupsSmall
                  currentUser={currentUser}
                  yourGroups={myGroups}
                />
              )}
            </Popper>
          </Hidden>
          <Hidden mdUp>
            <Box my="4px">
              <Button
                onClick={handleClick}
                disabled={!currentUser}
                variant="outlined"
                fullWidth
                size="small"
              >
                <Typography variant="button">My groups</Typography>
              </Button>
            </Box>
          </Hidden>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={10} sm={11} md={10} lg={11}>
              <Searchbar
                currentUser={currentUser}
                searchCallback={searchCallback}
              />
            </Grid>
            <Grid item xs={2} sm={1} md={2} lg={1}>
              <Grid justify="center" container>
                <Grid item md={12}>
                  <VirtualGroupDialog />
                </Grid>
              </Grid>
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
          <Grid item md={4} lg={3}>
            <Box mt={1}>
              <Typography variant="h6" align="center">
                My groups
              </Typography>
            </Box>
            <Box width={1} my={1} className={myGroupsClasses.list}>
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectMyVirtualGroups,
  selectVirtualGroupsByModule,
} from '../../../redux/virtualGroup/virtualGroup.selector';
import {
  readMyVirtualGroups,
  readVirtualGroupsByModule,
} from '../../../redux/virtualGroup/virtualGroup.action';
import { selectCurrentUser } from '../../../redux/user/user.selector';

import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Popper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

//import { Searchbar } from '../../../components/Searchbar/Searchbar';
import { CustomAlert } from '../../../components/shared/CustomAlert';
import { Module } from '../../../models/Module';
import { materialStyles } from '../../../styles/material.styles';
import { YourGroupsSmall } from '../../../components/YourVirtualGroupsSmall/YourVirtualGroupsSmall';
import { VirtualGroupCard } from '../../../components/VirtualGroupCard/VirtualGroupCard';
import { YourGroupCard } from '../../../components/YourVirtualGroupCard/YourVirtualGroupCard';
import { VirtualGroupDialog } from '../../../components/VirtualGroupDialog/VirtualGroupDialog';

const recruitingGroupStyles = makeStyles({
  header: {
    margin: '10px 0px',
    paddingRight: 0,
    flexDirection: 'row',
  },
  list: {
    overflow: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

const yourGroupStyles = makeStyles({
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

export const VirtualGroupModulePageComponent = ({
  myGroups,
  currentUser,
  readMyGroups,
  readGroupsByModule,
  virtualGroupsByModule,
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const styles = materialStyles();
  const { moduleCode } = useParams();
  const recruitingGroupsClasses = recruitingGroupStyles();
  const yourGroupsClasses = yourGroupStyles();
  const module = Module.getModuleByModuleCode(moduleCode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // fetch groups under the module and my groups
    readGroupsByModule(moduleCode);
    if (currentUser && currentUser.id != null) {
      readMyGroups(currentUser.id);
    }
  }, [moduleCode, currentUser, readGroupsByModule, readMyGroups]);

  const groups = virtualGroupsByModule(moduleCode);
  // filter out private groups
  const recruitingGroups = groups
    ? groups.filter((group) => group.isPublic)
    : [];

  return (
    <Box className={styles.root}>
      <Grid container spacing={4}>
        <Grid item md={8} lg={9} xs={12}>
          <Box mb={!xs ? 2 : 0} mt={xs ? 1 : 0}>
            <Typography variant="h4" align="center">
              {moduleCode}
            </Typography>
          </Box>
          <Hidden mdUp>
            <Popper
              open={open}
              style={{ width: '94%' }}
              anchorEl={anchorEl}
              placement="bottom-end"
            >
              {currentUser && (
                <YourGroupsSmall
                  currentUser={currentUser}
                  yourGroups={myGroups}
                />
              )}
            </Popper>
            <Box width={1} mb="4px">
              <Grid container alignItems="center">
                <Grid item xs={10} sm={11}>
                  <Button
                    onClick={handleClick}
                    disabled={!currentUser}
                    variant="outlined"
                    fullWidth
                    size="small"
                  >
                    <Typography variant="button">My groups</Typography>
                  </Button>
                </Grid>
                <Grid item xs={2} sm={1}>
                  <Grid justify="center" container>
                    <Grid item>
                      <VirtualGroupDialog
                        modulePage
                        module={{
                          moduleCode: module.moduleCode,
                          title: module.title,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Hidden>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={12}>
              <Hidden smDown>
                <Grid container justify="center">
                  <Grid item md={4}>
                    <VirtualGroupDialog
                      modulePage
                      module={{
                        moduleCode: module.moduleCode,
                        title: module.title,
                      }}
                    />
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Box className={recruitingGroupsClasses.list} width={1}>
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
              groups &&
              !xs &&
              recruitingGroups.map((virtualGroup, index) => (
                <VirtualGroupCard
                  modulePage
                  currentUser={currentUser}
                  key={index}
                  groupData={virtualGroup}
                />
              ))}
            {currentUser && groups && xs && (
              <Grid container>
                {recruitingGroups.map((virtualGroup, index) => (
                  <Grid item xs={12} key={index}>
                    <VirtualGroupCard
                      modulePage
                      currentUser={currentUser}
                      key={index}
                      groupData={virtualGroup}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {groups && groups.length === 0 && (
              <Box width={1}>
                <Alert severity="info">
                  No signs of life detected on this Module. Feel free to form
                  the first ever crew to explore this Module!
                </Alert>
              </Box>
            )}
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={4} lg={3}>
            <Box my="8px">
              <Typography variant="h6" align="center">
                My groups
              </Typography>
            </Box>
            <Box width={1} className={yourGroupsClasses.list}>
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

export const VirtualGroupModulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupModulePageComponent);

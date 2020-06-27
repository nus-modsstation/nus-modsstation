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

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
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
              <Searchbar searchOptions={VirtualGroup.searchOptions} />
            </Grid>
            <Grid item xs={2} md={1}>
              <VirtualGroupDialog />
            </Grid>
          </Grid>
          <Box className={recruitingGroupsClasses.list} width={1}>
            {modules.map((module, index) => (
              <VirtualGroupModule
                currentUser={currentUser}
                moduleCode={module.id}
                key={index}
                groups={virtualGroupsByModule(module.id)}
              />
            ))}
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={3}>
            <Box my="8px">
              <Typography variant="h6" align="center">
                My groups
              </Typography>
            </Box>
            <Box width={1} className={myGroupsClasses.list}>
              {myGroups.map((virtualGroup, index) => (
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Card, CardMedia } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {
  leaveGroupStart,
  deleteGroupStart,
  sendJoinRequestStart,
} from '../../redux/virtualGroup/virtualGroup.action';
import { selectSendRequestSuccess } from '../../redux/virtualGroup/virtualGroup.selector';
import { readDocument } from '../../services/firestore';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  flexCard: {
    [theme.breakpoints.down('xs')]: {
      height: 164,
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      height: 200,
      width: 178,
    },
    marginRight: 25,
    marginBottom: 15,
    padding: 8,
  },
  card: {
    flex: 'none',
    height: 200,
    width: 175,
    marginRight: 25,
    marginBottom: 5,
    padding: 8,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  groupPicture: {
    width: 50,
    height: 50,
  },
  dialogTitleText: {
    display: 'inline',
    padding: 0,
  },
  dialogTitleSection: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: 'center',
  },
}));

const VirtualGroupCardComponent = ({
  currentUser,
  modulePage,
  groupData,
  sendJoinRequestStart,
  leaveGroupStart,
  deleteGroupStart,
}) => {
  const component = componentStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const isMember = groupData.users.includes(currentUser.id);

  const [open, setOpen] = React.useState(false);
  const [requestSent, setRequestSent] = React.useState(
    groupData.userRequests.includes(currentUser.id)
  );
  const [usernameMap, setUsernameMap] = React.useState({});
  const [userRequestsMap, setUserRequestsMap] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendJoinRequest = async () => {
    const updateGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    setRequestSent(true);
    sendJoinRequestStart(updateGroupData);
  };

  const leaveGroup = () => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
      data: currentUser.id,
    };
    leaveGroupStart(virtualGroupData);
    const idx = groupData.users.indexOf(currentUser.id);
    if (idx !== -1) {
      groupData.users.splice(idx, 1);
    }
    setOpen(false);
  };

  const deleteGroup = () => {
    const virtualGroupData = {
      id: groupData.id,
      moduleCode: groupData.moduleCode,
    };
    deleteGroupStart(virtualGroupData);
    setOpen(false);
  };

  useEffect(() => {
    groupData.users.forEach(async (userId) => {
      const user = await readDocument({ collection: 'users', docId: userId });
      usernameMap[userId] = user.username;
      setUsernameMap(usernameMap);
    });
    groupData.userRequests.forEach(async (userId) => {
      const user = await readDocument({ collection: 'users', docId: userId });
      userRequestsMap[userId] = user.username;
      setUserRequestsMap(userRequestsMap);
    });
  }, [groupData]);

  return (
    <Card
      variant="outlined"
      className={modulePage ? component.flexCard : component.card}
    >
      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={handleClose}
        fullScreen={xs}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <Box className={component.dialogTitleSection}>
          <DialogTitle
            className={component.dialogTitleText}
            id="form-dialog-title"
          >
            Virtual Group Profile
          </DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <VirtualGroupInfo
            currentUser={currentUser}
            groupData={groupData}
            members={usernameMap}
            joinRequests={userRequestsMap}
            leaveGroup={leaveGroup}
            deleteGroup={deleteGroup}
          />
        </DialogContent>
      </Dialog>
      <Box
        height={1}
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          maxHeight={modulePage ? (xs ? 0.72 : 0.66) : 0.66}
          overflow="hidden"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box mr="8px">
            <CardMedia component="img" className={component.groupPicture} />
          </Box>
          <Box
            width={1}
            p="4px"
            mb="4px"
            display="flex"
            justifyContent="center"
          >
            <Link onClick={handleClickOpen} component="button" underline="none">
              <Typography
                variant={modulePage ? (xs ? 'body1' : 'body2') : 'body2'}
                align="center"
                noWrap
              >
                {groupData.groupName}
              </Typography>
            </Link>
          </Box>
          <Box width={1} px="4px" height="auto" overflow="hidden">
            <Typography variant="caption" component="p" align="center">
              {groupData.description}
            </Typography>
          </Box>
        </Box>
        <Button
          disabled={isMember || requestSent}
          onClick={sendJoinRequest}
          fullWidth
        >
          {isMember ? 'Joined' : requestSent ? 'Pending' : 'Join'}
        </Button>
      </Box>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  sendRequestSuccess: selectSendRequestSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  sendJoinRequestStart: (groupData) =>
    dispatch(sendJoinRequestStart(groupData)),
  leaveGroupStart: (groupData) => dispatch(leaveGroupStart(groupData)),
  deleteGroupStart: (groupData) => dispatch(deleteGroupStart(groupData)),
});

export const VirtualGroupCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualGroupCardComponent);

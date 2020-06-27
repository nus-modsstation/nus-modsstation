import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@material-ui/core';

import { VirtualGroupInfo } from '../../components/VirtualGroupInfo/VirtualGroupInfo';

const componentStyles = makeStyles((theme) => ({
  cardContent: {
    margin: '5px 0px',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  button: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
  groupPicture: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start',
    marginRight: 10,
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

export const YourGroupCard = ({ currentUser, groupData }) => {
  const component = componentStyles();
  const theme = useTheme();

  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width={1} component={Paper} mb="5px">
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
          <VirtualGroupInfo currentUser={currentUser} groupData={groupData} />
        </DialogContent>
      </Dialog>
      <Box
        component={ButtonBase}
        style={{
          textDecoration: 'none',
          color: 'black',
          '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
            color: 'black',
          },
        }}
        onClick={handleClickOpen}
        minWidth={1}
        p="12px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="hidden"
      >
        <Typography variant="caption" align="left">
          {groupData.moduleCode}
        </Typography>
        <Box className={component.cardContent}>
          <Box component="img" className={component.groupPicture} />
          <Box height={1} maxWidth={0.75}>
            <Typography variant="body1" noWrap align="left">
              {groupData.groupName}
            </Typography>
            <Box my="2px">
              <Typography component="p" variant="caption" align="left" noWrap>
                {groupData.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  updateUserStart,
  clearUpdateSuccess,
} from '../../redux/user/user.action';
import { selectUpdateSuccess } from '../../redux/user/user.selector';

import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '196px',
    height: '196px',
  },
  avatarIcon: {
    fontSize: '120px',
  },
}));

const IntroCarouselComponent = ({
  currentUser,
  initialOpen,
  closeCallback,
  updateUserStart,
  updateSuccess,
  clearUpdateSuccess,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(
    initialOpen ||
      (currentUser !== null &&
        (currentUser.firstLogin === undefined ? true : currentUser.firstLogin))
  );
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  const features = [
    {
      icon: <LocalLibraryIcon className={classes.avatarIcon} />,
      title: 'Study group',
      subtitle: 'Create or join a study group near your location.',
      mediaBackgroundColor: green['400'],
      avatarColor: green['500'],
      textBackgroundColor: green['600'],
    },
    {
      icon: <ContactMailIcon className={classes.avatarIcon} />,
      title: 'Virtual group',
      subtitle:
        'Discuss the module contents with your coursemates anywhere, anytime.',
      mediaBackgroundColor: blue['400'],
      avatarColor: blue['500'],
      textBackgroundColor: blue['600'],
    },
    {
      icon: <QuestionAnswerIcon className={classes.avatarIcon} />,
      title: 'Q&A thread',
      subtitle:
        'Clarify your doubts and ask any questions related to the modules.',
      mediaBackgroundColor: orange['400'],
      avatarColor: orange['500'],
      textBackgroundColor: orange['600'],
    },
    {
      icon: <DashboardIcon className={classes.avatarIcon} />,
      title: 'Dashboard',
      subtitle: 'Add your modules and see all your groups here.',
      mediaBackgroundColor: red['400'],
      avatarColor: red['500'],
      textBackgroundColor: red['600'],
    },
    {
      icon: <MailIcon className={classes.avatarIcon} />,
      title: 'Chat room',
      subtitle: 'Find all the joined groups and useful notes here.',
      mediaBackgroundColor: deepPurple['400'],
      avatarColor: deepPurple['500'],
      textBackgroundColor: deepPurple['600'],
    },
  ];

  const closeCarousel = () => {
    setOpen(false);
    if (closeCallback) {
      closeCallback();
    }
    if (
      currentUser !== null &&
      (currentUser.firstLogin === undefined || currentUser.firstLogin)
    ) {
      // set firstLogin to false
      // for not showing the carousel again
      const userData = {
        id: currentUser.id,
        data: { firstLogin: false },
      };
      updateUserStart(userData);
    }
  };

  useEffect(() => {
    if (initialOpen !== undefined) {
      setOpen(initialOpen);
    }
  }, [initialOpen]);

  useEffect(
    () => () => {
      if (updateSuccess) {
        clearUpdateSuccess();
      }
    },
    [updateSuccess, clearUpdateSuccess]
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AutoRotatingCarousel
        label="Get started"
        open={open}
        mobile={matchXs}
        onClose={closeCarousel}
        onStart={closeCarousel}
        style={{ position: 'absolute' }}
      >
        {features.map((feature, index) => (
          <Slide
            key={index}
            media={
              <Avatar
                style={{ backgroundColor: feature.avatarColor }}
                className={classes.avatar}
              >
                {feature.icon}
              </Avatar>
            }
            mediaBackgroundStyle={{
              backgroundColor: feature.mediaBackgroundColor,
            }}
            style={{ backgroundColor: feature.textBackgroundColor }}
            title={feature.title}
            subtitle={feature.subtitle}
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  updateSuccess: selectUpdateSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserStart: (userData) => dispatch(updateUserStart(userData)),
  clearUpdateSuccess: () => dispatch(clearUpdateSuccess()),
});

export const IntroCarousel = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroCarouselComponent);

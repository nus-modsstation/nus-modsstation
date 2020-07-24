import React from 'react';

import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BookIcon from '@material-ui/icons/Book';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

export class Dashboard {
  static options = [
    {
      title: 'Friends',
      icon: <PeopleAltIcon />,
      clickCallback: () => console.log('Friends clicked'),
    },
    {
      title: 'Notebooks',
      icon: <BookIcon />,
      clickCallback: () => console.log('Notebooks clicked'),
    },
    {
      title: 'Statistics',
      icon: <AssessmentIcon />,
      clickCallback: () => console.log('Statistics clicked'),
    },
    {
      title: 'Guides',
      icon: <ViewCarouselIcon />,
      clickCallback: () =>
        window.open(
          'https://docs.google.com/document/d/1xacB7o0NLmsWo5e6pSJgYgA8MODiF4Pppj9ZYEIHcqM/edit?usp=sharing',
          '_blank'
        ),
    },
  ];
}

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { selectMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.selector';

import { materialStyles } from '../../styles/material.styles';
import { Box } from '@material-ui/core';
import { ChatRoomList } from '../../components/ChatRoom/ChatRoomList';

const ChatRoomComponent = ({ user, myGroups, myVirtualGroups }) => {
  const materialClasses = materialStyles();
  const { id } = useParams();

  const roomNames = [
    ...myGroups.map((group) => group.title),
    ...myVirtualGroups.map((group) => group.groupName),
  ];
  const roomIds = [
    ...myGroups.map((group) => group.id),
    ...myVirtualGroups.map((group) => group.id),
  ];

  return (
    <Box className={materialClasses.root}>
      <ChatRoomList
        id={id}
        user={user}
        roomIds={roomIds}
        roomNames={roomNames}
      />
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
});

export const ChatRoomPage = connect(mapStateToProps)(ChatRoomComponent);

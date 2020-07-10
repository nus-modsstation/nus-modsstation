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

  const roomData = [
    ...myGroups.map((group) => {
      return { name: group.title, id: group.id, type: 'study-group' };
    }),
    ...myVirtualGroups.map((group) => {
      return { name: group.groupName, id: group.id, type: 'virtual-group' };
    }),
  ];

  return (
    <Box className={materialClasses.root}>
      <ChatRoomList id={id} user={user} roomData={roomData} />
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
});

export const ChatRoomPage = connect(mapStateToProps)(ChatRoomComponent);

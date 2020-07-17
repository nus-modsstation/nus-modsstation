import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { selectMyGroups } from '../../redux/studyGroup/studyGroup.selector';
import { selectMyVirtualGroups } from '../../redux/virtualGroup/virtualGroup.selector';
import {
  selectMyQAThreads,
  selectMyStarredQAThreads,
  selectCurrentQAThread,
} from '../../redux/qaThread/qaThread.selector';
import {
  starQAThread,
  starQAThreadSuccess,
  removeStarredQAThread,
  removeStarredThreadSuccess,
} from '../../redux/qaThread/qaThread.action';

import { materialStyles } from '../../styles/material.styles';
import { Box } from '@material-ui/core';
import { ChatRoomList } from '../../components/ChatRoom/ChatRoomList';

const ChatRoomComponent = ({
  user,
  myGroups,
  myVirtualGroups,
  myThreads,
  myStarredThreads,
  myCurrentThread,
  starThread,
  starThreadReduce,
  unstarThread,
  unstarThreadReduce,
}) => {
  const materialClasses = materialStyles();
  const { id } = useParams();

  const roomData = [
    ...myGroups.map((group) => {
      return { name: group.title, id: group.id, type: 'study-group' };
    }),
    ...myVirtualGroups.map((group) => {
      return { name: group.groupName, id: group.id, type: 'virtual-group' };
    }),
    ...myThreads.map((thread) => {
      return {
        name: thread.taskName,
        id: thread.id,
        type: 'qa-thread',
        isOwner: true,
      };
    }),
    ...myStarredThreads.map((thread) => {
      return {
        name: thread.taskName,
        id: thread.id,
        module: thread.moduleCode,
        type: 'qa-thread',
        isOwner: false,
      };
    }),
  ];

  // if a QA thread (neither starred nor owned by user) is visited then
  // push the necessary thread data to roomData with a temp flag
  // to enable starring
  if (myCurrentThread) {
    roomData.push({
      name: myCurrentThread.taskName,
      id: myCurrentThread.id,
      module: myCurrentThread.moduleCode,
      type: 'qa-thread',
      isOwner: false,
      temp: true,
    });
  }

  const starRoom = (thread) => {
    const updateThreadData = {
      id: thread.id,
      moduleCode: thread.moduleCode,
      data: user.id,
    };
    starThread(updateThreadData);
    // update the reducer by moving the thread from the temporary state
    // to starredThreads and resetting said temporary state
    starThreadReduce();
  };

  const removeRoom = (thread) => {
    const updateThreadData = {
      id: thread.id,
      moduleCode: thread.module,
      data: user.id,
    };
    unstarThread(updateThreadData);
    // update the reducer state
    unstarThreadReduce(updateThreadData);
  };

  return (
    <Box className={materialClasses.root}>
      <ChatRoomList
        id={id}
        user={user}
        roomData={roomData}
        starRoom={starRoom}
        removeRoom={removeRoom}
      />
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  myGroups: selectMyGroups,
  myVirtualGroups: selectMyVirtualGroups,
  myThreads: selectMyQAThreads,
  myStarredThreads: selectMyStarredQAThreads,
  myCurrentThread: selectCurrentQAThread,
});

const mapDispatchToProps = (dispatch) => ({
  removeThread: (thread) => dispatch(removeStarredQAThread(thread)),
  starThread: (thread) => dispatch(starQAThread(thread)),
  starThreadReduce: () => dispatch(starQAThreadSuccess()),
  unstarThread: (thread) => dispatch(removeStarredQAThread(thread)),
  unstarThreadReduce: (thread) => dispatch(removeStarredThreadSuccess(thread)),
});

export const ChatRoomPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomComponent);

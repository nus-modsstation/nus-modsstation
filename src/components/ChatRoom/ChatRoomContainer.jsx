import React from 'react';

import { listenChatMessages } from '../../services/messages';

export const ChatRoomContainer = () => {
  return (
    <div>
      {listenChatMessages({
        groupId: 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
        callback: (snapshot) => {
          console.log(snapshot.val());
        },
      })}
    </div>
  );
};

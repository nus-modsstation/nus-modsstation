import { database } from '../lib/firebase/firebase.config';

const databaseRef = 'chatMessages/';

export const writeChatMessages = ({
  groupId = 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
  userId,
  message,
  type = '',
  tag = '',
}) => {
  let messageRef = database.ref(databaseRef + groupId).push();
  messageRef.set({
    id: messageRef.key,
    timestamp: Date.now(),
    upCount: 0,
    downCount: 0,
    userId,
    message,
    type,
    tag,
  });
};

export const listenChatMessages = ({
  groupId = 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
  callback,
}) => {
  database.ref(databaseRef + groupId).on('value', callback);
};

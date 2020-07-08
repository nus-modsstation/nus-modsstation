import { database } from '../lib/firebase/firebase.config';

const databaseRef = 'chatMessages/';

export const writeChatMessages = ({
  id = 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
  userId,
  message,
  type = '',
  tag = '',
}) => {
  let messageRef = database.ref(databaseRef + id).push();
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
  id = 'AV24cIMRXUWrBqkYc7cfqm2BTOy1',
  callback,
}) => {
  database.ref(databaseRef + id).on('value', callback);
};

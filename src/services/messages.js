import { database } from '../lib/firebase/firebase.config';

const databaseRef = 'chatMessages/';

export const writeChatMessages = ({
  id,
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

export const listenChatMessages = ({ id, callback }) => {
  database.ref(databaseRef + id).on('value', callback);
};

export const listenOnMessageAdded = ({ id, callback }) => {
  database
    .ref(databaseRef + id)
    .orderByChild('timestamp')
    .limitToLast(1)
    .on('child_added', callback);
};

export const readRecentMessages = ({
  id,
  size = 10,
  callback,
  previousTimestamp,
  previousKey,
}) => {
  if (previousTimestamp == null || previousKey == null) {
    database
      .ref(databaseRef + id)
      .orderByChild('timestamp')
      .limitToLast(size)
      .once('value')
      .then(callback);
  } else {
    database
      .ref(databaseRef + id)
      .orderByChild('timestamp')
      .endAt(previousTimestamp)
      .limitToLast(size + 1)
      .once('value')
      .then(callback);
  }
};

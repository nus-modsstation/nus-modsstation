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
    userReactions: { react: 0 },
    upvoteCount: 0,
    downvoteCount: 0,
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

export const cancelOnMessageAdded = ({ id }) => {
  database
    .ref(databaseRef + id)
    .orderByChild('timestamp')
    .limitToLast(1)
    .off();
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

export const updateReactChatMessage = (roomId, messageId, updateData) => {
  // updateData format:
  // {
  //   userId: id of the user reacting to the message,
  //   reaction: 1 if upvote, -1 if downvote
  // }
  if (updateData.userId && updateData.reaction) {
    database
      .ref(databaseRef + roomId + '/' + messageId)
      .transaction((message) => {
        if (
          message &&
          message.userReactions
          //&& message.upvoteCount &&
          //message.downvoteCount &&
        ) {
          if (message.userReactions[updateData.userId]) {
            if (
              updateData.reaction !== message.userReactions[updateData.userId]
            ) {
              message.upvoteCount = message.upvoteCount + updateData.reaction;
              message.downvoteCount =
                message.downvoteCount - updateData.reaction;
              message.userReactions[updateData.userId] = updateData.reaction;
            }
          } else {
            if (updateData.reaction === 1) {
              message.upvoteCount += updateData.reaction;
            } else {
              message.downvoteCount -= updateData.reaction;
            }
            message.userReactions[updateData.userId] = updateData.reaction;
          }
        }
        return message;
      });
  }
};

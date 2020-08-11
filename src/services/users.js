import {
  readDocument,
  readDocumentsWhereEqual,
  updateDocumentArrayUnion,
  updateDocumentArrayRemove,
} from './firestore';

const collectionName = 'users';

export const findUserById = async (id) => {
  const userData = await readDocument({
    collection: collectionName,
    docId: id,
  });
  return userData;
};

export const findUserByEmail = async (query) => {
  const userData = await readDocumentsWhereEqual({
    collection: collectionName,
    fieldName: 'email',
    fieldValue: query,
  });
  return userData;
};

export const sendFriendRequest = async ({ sentUserId, receivedUserId }) => {
  await updateDocumentArrayUnion({
    collection: collectionName,
    docId: receivedUserId,
    field: 'friendRequests',
    data: sentUserId,
  });
  return;
};

export const removeFriendRequest = async ({ currentUserId, requestUserId }) => {
  await updateDocumentArrayRemove({
    collection: collectionName,
    docId: currentUserId,
    field: 'friendRequests',
    data: requestUserId,
  });
  return;
};

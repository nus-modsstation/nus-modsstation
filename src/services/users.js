import { readDocument, readDocumentsWhereEqual } from './firestore';

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

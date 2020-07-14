import { readDocument } from './firestore';

export const findUserById = async (id) => {
  const userData = await readDocument({
    collection: 'users',
    docId: id,
  });
  return userData;
};

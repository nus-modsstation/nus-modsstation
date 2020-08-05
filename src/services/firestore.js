import { fb, firestore } from '../lib/firebase/firebase.config';

export const readDocument = async ({ collection, docId }) => {
  let doc = await firestore.collection(collection).doc(docId).get();
  if (doc.exists) {
    return doc.data();
  } else {
    console.log('docId:', docId);
    throw new Error('No such document!');
  }
};

export const readDocumentsWhereEqual = async ({
  collection,
  fieldName,
  fieldValue,
}) => {
  let snapshot = await firestore
    .collection(collection)
    .where(fieldName, '==', fieldValue)
    .get();
  if (snapshot.docs.length > 0) {
    const data = [];
    for (const doc of snapshot.docs) {
      data.push(doc.data());
    }
    return data;
  } else {
    return [];
  }
};

export const readDocumentsWhereContains = async ({
  collection,
  arrayName,
  fieldValue,
}) => {
  let snapshot = await firestore
    .collection(collection)
    .where(arrayName, 'array-contains', fieldValue)
    .get();
  if (snapshot.docs.length > 0) {
    const data = [];
    for (const doc of snapshot.docs) {
      data.push(doc.data());
    }
    return data;
  } else {
    return [];
  }
};

export const readDocumentsWhereIn = async ({
  collection,
  fieldName,
  fieldValue,
  fieldNames,
  fieldValues,
}) => {
  const collectionRef = firestore.collection(collection);
  let snapshot;
  if (fieldName !== undefined) {
    // handle single query
    snapshot = await collectionRef.where(fieldName, 'in', fieldValue).get();
  }
  //else if (fieldNames !== undefined) {
  // handle multiple queries
  //   let queries = collectionRef;
  //   for (let i = 0; i < fieldNames.length; i++) {
  //     // cannot perform multiple in search query
  //     if (fieldValues[i].length !== 0) {
  //       queries = queries.where(fieldNames[i], 'in', fieldValues[i]);
  //     }
  //   }
  //   snapshot = await queries.get();
  // }
  if (snapshot.docs.length > 0) {
    const data = [];
    for (const doc of snapshot.docs) {
      data.push(doc.data());
    }
    return data;
  } else {
    return [];
  }
};

export const listenDocument = async ({ collection, docId, callback }) => {
  return firestore
    .collection(collection)
    .doc(docId)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
};

export const listenDocumentsWhereEqual = async ({
  collection,
  fieldName,
  fieldValue,
  callback,
}) => {
  return firestore
    .collection(collection)
    .where(fieldName, '==', fieldValue)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
};

export const listenDocumentsWhereContains = async ({
  collection,
  arrayName,
  fieldValue,
  callback,
}) => {
  return firestore
    .collection(collection)
    .where(arrayName, 'array-contains', fieldValue)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
};

export const addDocument = async ({ collection, data, setId, docId }) => {
  if (setId) {
    let ref = firestore.collection(collection).doc();
    // set document's id
    data.id = ref.id;
    await ref.set(data);
  } else {
    await firestore.collection(collection).doc(docId).set(data);
  }
};

export const updateDocument = async ({ collection, docId, data }) => {
  await firestore.collection(collection).doc(docId).update(data);
};

export const updateDocumentArrayUnion = async ({
  collection,
  docId,
  field,
  data,
}) => {
  const ref = firestore.collection(collection).doc(docId);
  await ref.update({
    [field]: fb.firestore.FieldValue.arrayUnion(data),
  });
};

export const updateDocumentArrayRemove = async ({
  collection,
  docId,
  field,
  data,
}) => {
  const ref = firestore.collection(collection).doc(docId);
  await ref.update({
    [field]: fb.firestore.FieldValue.arrayRemove(data),
  });
};

export const deleteDocument = async ({ collection, docId }) => {
  await firestore.collection(collection).doc(docId).delete();
};

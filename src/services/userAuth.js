import { auth } from '../lib/firebase/firebase.config';

export const register = async ({ username, email, password }) => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  await userCredential.user.updateProfile({
    displayName: username,
  });
  return userCredential;
};

export const login = async ({ email, password }) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

export const logout = async () => {
  await auth.signOut();
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

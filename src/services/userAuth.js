import { auth } from '../lib/firebase/firebase.config';

export const register = async ({ username, email, password }) => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  console.log(`Welcome, ${userCredential.user.email}`);
  await userCredential.user.updateProfile({
    displayName: username,
  });
  console.log(`Hello, ${userCredential.user.displayName}`);
  return userCredential;
};

export const login = async ({ email, password }) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  console.log(`Welcome back, ${userCredential.user.displayName}`);
  return userCredential;
};

export const logout = async () => {
  await auth.signOut();
  console.log(`See you again`);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

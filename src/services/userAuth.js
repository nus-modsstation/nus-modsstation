import { auth } from '../lib/firebase/firebase.config';

export const register = async ({ username, email, password }) => {
  const userCredential = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  await userCredential.user.updateProfile({
    displayName: username,
  });
  // send verification email
  await userCredential.user.sendEmailVerification();
  return userCredential;
};

export const login = async ({ email, password }) => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  const user = userCredential.user;
  if (!user.emailVerified) {
    await userCredential.user.sendEmailVerification();
    throw Error('Please verify your email first');
  }
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

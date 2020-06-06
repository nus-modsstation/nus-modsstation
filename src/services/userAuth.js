import { auth } from '../lib/firebase/firebase.config';

export const registerUser = async ({ username, email, password }) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(`Welcome, ${userCredential.user.email}`);
    await userCredential.user.updateProfile({
      displayName: username,
    });
    console.log(`Hello, ${userCredential.user.displayName}`);
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    console.log(`Welcome back, ${userCredential.user.displayName}`);
  } catch (error) {
    console.log(error);
  }
};

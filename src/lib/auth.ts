import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

export const signInAdmin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAdmin = async () => {
  await signOut(auth);
};

export const subscribeAuthState = (onChange: (user: User | null) => void) => {
  return onAuthStateChanged(auth, onChange);
};

export const changeAdminPassword = async (
  currentPassword: string,
  nextPassword: string,
) => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("No authenticated admin session found.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, nextPassword);
};

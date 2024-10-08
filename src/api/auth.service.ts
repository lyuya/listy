import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const login = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const logout = async () => {
  auth.signOut();
};

const isUserConnected = (): boolean => {
  return !!auth.currentUser;
};

export { login, logout, isUserConnected };

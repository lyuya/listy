import { auth, db } from "@/firebase/firebase";
import { UserSetting } from "@/types/userSetting";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const collectionName = "user";

const updateTheme = async (theme: string) => {
  const userSetting = await getUserSetting();
  const updatedUserSetting: UserSetting = {
    theme: theme,
    userId: auth.currentUser?.uid ?? "",
  };
  if (userSetting.id) {
    setDoc(doc(db, collectionName, userSetting.id), updatedUserSetting);
  } else {
    addDoc(collection(db, collectionName), updatedUserSetting);
  }
};

const getUserSetting = async (): Promise<UserSetting> => {
  const users = collection(db, collectionName);
  const q = query(users, where("userId", "==", auth.currentUser?.uid));
  const userSettings: UserSetting[] = (await getDocs(q)).docs.map((doc) => ({
    id: doc.id,
    userId: doc.data().userId,
    theme: doc.data().theme,
  }));
  return userSettings[0];
};

export { updateTheme, getUserSetting };

import { auth, db } from "../firebase/firebase";
import { UserSetting } from "../types/userSetting";
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

const updateTheme = async (theme: string): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No authenticated user found.");
      return;
    }

    const userSetting = await getUserSetting();
    const updatedUserSetting: UserSetting = {
      theme: theme,
      userId: currentUser.uid,
    };

    if (userSetting?.id) {
      await setDoc(doc(db, collectionName, userSetting.id), updatedUserSetting);
    } else {
      await addDoc(collection(db, collectionName), updatedUserSetting);
    }
  } catch (error) {
    console.error("Error updating theme:", error);
  }
};

const getUserSetting = async (): Promise<UserSetting | undefined> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.warn("No authenticated user.");
      return;
    }

    const users = collection(db, collectionName);
    const q = query(users, where("userId", "==", currentUser.uid));
    const userSettings: UserSetting[] = (await getDocs(q)).docs.map((doc) => ({
      id: doc.id,
      userId: doc.data().userId,
      theme: doc.data().theme,
    }));

    if (userSettings.length > 0) {
      return userSettings[0];
    }
  } catch (error) {
    console.error("Error fetching user settings:", error);
  }

  return undefined;
};

export { updateTheme, getUserSetting };

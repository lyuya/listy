import { Task } from "@/types/task";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasks = collection(db, "task");

const getTaskByDate = async (date: Date): Promise<Task[]> => {
  try {
    let dateBefore = new Date(date);
    dateBefore.setHours(0, 0, 0, 0);
    let dateAfter = new Date(date);
    dateAfter.setHours(23, 59, 59, 999);

    const q = query(
      tasks,
      where("start_time", ">=", Timestamp.fromDate(dateBefore).seconds * 1000),
      where("start_time", "<", Timestamp.fromDate(dateAfter).seconds * 1000),
    );
    const tasksSnapshotWithCurrentDateQuery = getDocs(q);
    const taskList: Task[] = (await tasksSnapshotWithCurrentDateQuery).docs.map(
      (doc) => ({
        id: doc.id,
        name: doc.data()["name"],
        start_time: doc.data()["start_time"],
        finished_time: doc.data()["finished_time"],
        checked: doc.data()["checked"],
        description: doc.data()["description"],
        subtasks: doc.data()["subtasks"],
      }),
    );
    return taskList;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
const updateTask = async (newTask: Task): Promise<void> => {
  try {
    if (newTask.id) {
      setDoc(doc(db, "task", newTask.id), newTask);
    } else {
      addDoc(tasks, newTask);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
export { getTaskByDate, updateTask };
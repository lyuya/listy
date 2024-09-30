// Import the functions you need from the SDKs you need
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
import { Task } from "../types/task";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasks = collection(db, "task");

const getTaskByDate = async (date: Date): Promise<Task[]> => {
  try {
    let dateBefore = new Date(date);
    dateBefore.setUTCHours(0, 0, 0, 0);
    let dateAfter = new Date(date);
    dateAfter.setDate(date.getDate() + 1);
    dateAfter.setUTCHours(23, 59, 59, 999);
    const q = query(
      tasks,
      where("start_time", ">=", Timestamp.fromDate(dateBefore)),
      where("start_time", "<", Timestamp.fromDate(dateAfter)),
    );
    const tasksSnapshotWithCurrentDateQuery = getDocs(q);
    const taskList: Task[] = (await tasksSnapshotWithCurrentDateQuery).docs.map(
      (doc) => ({
        id: doc.id,
        name: doc.data()["name"],
        start_time: (doc.data()["start_time"] as Timestamp).toDate(),
        finished_time: (doc.data()["finished_time"] as Timestamp).toDate(),
        checked: doc.data()["checked"],
        description: doc.data()["description"],
        subtasks: doc.data()["subtasks"],
      }),
    );
    console.log(taskList);
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

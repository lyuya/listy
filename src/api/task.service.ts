import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { Task } from "@/types/task";
const tasks = collection(db, "task");

const getTaskByDate = async (date: Date): Promise<Task[]> => {
  try {
    const dateBefore = new Date(date);
    dateBefore.setHours(0, 0, 0, 0);
    const dateAfter = new Date(date);
    dateAfter.setHours(23, 59, 59, 999);

    const q = query(
      tasks,
      where("startTime", ">=", Timestamp.fromDate(dateBefore).seconds * 1000),
      where("startTime", "<", Timestamp.fromDate(dateAfter).seconds * 1000),
    );
    const tasksSnapshotWithCurrentDateQuery = getDocs(q);
    let taskList: Task[] = (await tasksSnapshotWithCurrentDateQuery).docs.map(
      (doc) => ({
        id: doc.id,
        name: doc.data()["name"],
        startTime: doc.data()["startTime"],
        endTime: doc.data()["endTime"],
        checked: doc.data()["checked"],
        description: doc.data()["description"],
        subtasks: doc.data()["subtasks"],
        userId: doc.data()["userId"],
      }),
    );
    taskList = taskList.filter(
      (task) => task?.userId === auth.currentUser?.uid,
    );
    taskList.sort((task1, task2) => task1.startTime - task2.startTime);
    return taskList;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
const updateTask = async (newTask: Task): Promise<void> => {
  if (newTask.id) {
    setDoc(doc(db, "task", newTask.id), newTask);
  } else {
    addDoc(tasks, newTask);
  }
};

const deleteTask = async (id: string): Promise<void> => {
  const taskDocRef = doc(db, "task", id);
  await deleteDoc(taskDocRef);
};

export { getTaskByDate, updateTask, deleteTask };

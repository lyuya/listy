import React, { useEffect, useState } from "react";
import { getTaskByDate } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { loadTasksReducer } from "@/store/taskSlice";
import { useAppSelector } from "@/store/hooks";
import EditTaskModal from "../modal/editTask/EditTaskModal";
import { auth } from "@/firebase/firebase";
import AskForLoginModal from "../modal/login/AskForLoginModal";
import { User } from "firebase/auth";
import TaskItem from "../taskItem/TaskItem";
import Header from "../header/Header";
import { getUserSetting } from "@/api/user.service";

export default function TaskList() {
  const todayDate = new Date();
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const [userSettingIsLoaded, setUserSettingIsLoaded] = useState(false);
  const tasks = useAppSelector((state) => state.task.value);
  const nextRoundedTime = (date: Date) => {
    const dateCloned = new Date(date);
    dateCloned.setHours(date.getHours() + 1);
    dateCloned.setMinutes(0, 0, 0);
    return dateCloned.getTime();
  };
  const [defaultTask, setDefaultTask] = useState({
    name: "",
    startTime: nextRoundedTime(todayDate),
    endTime: nextRoundedTime(todayDate),
    description: "",
    checked: false,
    subtasks: [],
    userId: "",
  });

  const openEditTaskModal = (index: number) => {
    setIsEditTaskOpen(true);
    setTaskIndex(index);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskOpen(false);
    setTaskIndex(undefined);
    getTasks();
  };

  const createNewTask = () => {
    if (auth.currentUser) {
      openCreateTaskModal();
    } else {
      openLoginModal();
    }
  };

  const openCreateTaskModal = () => {
    setIsEditTaskOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeAskForLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const getTasks = async () => {
    try {
      if (date) {
        const taskData = await getTaskByDate(date);
        dispatch(loadTasksReducer(taskData));
      } else {
        throw new Error("Date is not set correctly");
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const getTheme = async () => {
    const userSetting = await getUserSetting();
    if (userSetting) {
      const root = document.getElementById("theme-root");
      if (root) {
        root.className = "";
        root.classList.add(`${userSetting.theme}-mode`);
      }
    }
    setUserSettingIsLoaded(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      getTheme();
      // .then(() => {
      //   setUserSettingIsLoaded(true);
      // })
    });
  }, []);

  useEffect(() => {
    if (date) {
      getTasks();
      const newDefaultTask = {
        ...defaultTask,
        startTime: nextRoundedTime(date),
        endTime: nextRoundedTime(date),
      };
      setDefaultTask(newDefaultTask);
    }
  }, [date, user]);

  useEffect(() => {
    if (isEditTaskOpen || isLoginModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditTaskOpen, isLoginModalOpen]);

  if (!userSettingIsLoaded) {
    return <div id="theme-root">Loading...</div>;
  } else {
    return (
      <div id="theme-root">
        <div className="min-w-96">
          <Header></Header>
          <div className="py-4 lg:px-8 md:px-4">
            <div className="lg:grid lg:grid-cols-3 lg:gap-4 ">
              <div className="col-span-2" id="taskList">
                <ul>
                  {tasks.map((task, i) => (
                    <TaskItem
                      key={i}
                      task={task}
                      openEditTaskModal={() => openEditTaskModal(i)}
                    ></TaskItem>
                  ))}
                </ul>
              </div>
              <div>
                <div className="rounded-lg bg-light	box-border h-130 w-500 py-3 px-4 my-3 mx-4">
                  <p className="font-semibold text-primary">Task Summary</p>
                  <ul className="text-primary text-sm font-medium">
                    <li className="flex justify-between">
                      <span>Total time</span>
                      <span>
                        {Math.floor(
                          tasks
                            .map((task) => task.endTime - task.startTime)
                            .reduce(
                              (duration1, duration2) => duration1 + duration2,
                              0,
                            ) /
                            60000 /
                            60,
                        )}{" "}
                        hours
                        {(tasks
                          .map((task) => task.endTime - task.startTime)
                          .reduce(
                            (duration1, duration2) => duration1 + duration2,
                            0,
                          ) /
                          60000) %
                          60}{" "}
                        minutes
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Number of task</span>
                      <span>{tasks.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Number of completed task</span>
                      <span>
                        {tasks.filter((task) => task.checked).length}/
                        {tasks.length}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <footer className="fixed bottom-10 right-4">
            <div className="px-8 float-right	">
              <button
                className="bg-primary rounded-full text-white text-2xl py-2 px-4 text-2xl w-12 h-12 p-auto"
                onClick={createNewTask}
              >
                +
              </button>
            </div>
          </footer>
        </div>
        <div>
          {isEditTaskOpen && (
            <EditTaskModal
              onClose={closeEditTaskModal}
              task={taskIndex !== undefined ? tasks[taskIndex] : defaultTask}
            ></EditTaskModal>
          )}
          {isLoginModalOpen && (
            <AskForLoginModal
              onClose={closeAskForLoginModal}
            ></AskForLoginModal>
          )}
        </div>
      </div>
    );
  }
}

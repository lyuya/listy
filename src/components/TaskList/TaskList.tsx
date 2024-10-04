import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarModal from "@/components/modal/calendar/CalendarModal";
import { getTaskByDate, updateTask } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { loadTasksReducer, toggleTaskReducer } from "@/store/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./TaskList.module.css";
import EditTaskModal from "../modal/editTask/EditTaskModal";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingModal from "@/components/modal/setting/SettingModal";
import { auth } from "@/firebase/firebase";
import AskForLoginModal from "../modal/login/AskForLoginModal";

export default function TaskList() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [date, setDate] = useState<Date>(new Date());
  const dispatch = useDispatch();

  const tasks = useAppSelector((state) => state.task.value);
  const user = useAppSelector((state) => state.user.value);

  const nextRoundedTime = (date: Date) => {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0, 0, 0);
    return date.getTime();
  };
  const defaultTask: Task = {
    name: "",
    startTime: nextRoundedTime(new Date()),
    endTime: nextRoundedTime(new Date()),
    description: "",
    checked: false,
    subtasks: [],
    userId: "",
  };
  const addOneDay = () => {
    const _date = new Date(date);
    _date.setDate(date.getDate() + 1);
    setDate(_date);
  };

  const minusOneDay = () => {
    const _date = new Date(date);
    _date.setDate(date.getDate() - 1);
    setDate(_date);
  };

  const openCalendarModal = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarOpen(false);
  };

  const openEditTaskModal = (index: number) => {
    setIsEditTaskOpen(true);
    setTaskIndex(index);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskOpen(false);
    setTaskIndex(undefined);
    getTasks();
  };

  const onDateChange = (newDate: Dayjs) => {
    setDate(newDate.toDate());
  };

  const createNewTask = () => {
    if (user?.uid) {
      openCreateTaskModal();
    } else if (auth.currentUser?.uid) {
      dispatch(loadTasksReducer(auth.currentUser));
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

  const openSettingModal = () => {
    setIsSettingOpen(true);
  };

  const closeSettingModal = () => {
    setIsSettingOpen(false);
  };

  const getTasks = async () => {
    try {
      const taskData = await getTaskByDate(date);
      dispatch(loadTasksReducer(taskData));
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const setOneTaskChecked = (i: number) => {
    const taskCloned = { ...tasks[i] };
    taskCloned.checked = !taskCloned.checked;
    updateTask(taskCloned).then(
      () => {
        dispatch(toggleTaskReducer(taskCloned));
      },
      (error) => console.error("Error updating task:", error),
    );
  };

  useEffect(() => {
    getTasks();
  }, [date, user]);
  
  return (
    <>
      <header>
        <div className="inline-flex w-full justify-between px-8">
          <div className="text-2xl p-5">
            <button className="text-amber-600 px-2" onClick={minusOneDay}>
              &#10094;
            </button>
            {date.toLocaleString("default", { month: "long" })}
            &ensp;
            {date.getDate().toLocaleString()}
            <span className="text-amber-600 px-2">{date.getFullYear()}</span>
            <button className="text-amber-600 pr-2" onClick={addOneDay}>
              &#10095;
            </button>
          </div>
          <div className="m-4 flex gap-2">
            <button className="text-amber-600" onClick={openCalendarModal}>
              <EditCalendarOutlinedIcon fontSize="medium"></EditCalendarOutlinedIcon>
            </button>
            <button className="text-amber-600" onClick={openSettingModal}>
              <SettingsOutlinedIcon></SettingsOutlinedIcon>
            </button>
          </div>
          {isCalendarOpen && (
            <CalendarModal
              defaultDate={date}
              onClose={closeCalendarModal}
              onDateChange={onDateChange}
            />
          )}
          {isSettingOpen && (
            <SettingModal onClose={closeSettingModal}></SettingModal>
          )}
        </div>
      </header>
      <div className="py-4 px-8">
        <div className="grid grid-cols-3 gap-4 ">
          <div className="col-span-2" id="taskList">
            <ul>
              {tasks.map((task, i) => {
                const startTimeToDisplay = dayjs(task.startTime).format(
                  "HH:mm",
                );
                const endTimeToDisplay = dayjs(task.endTime).format("HH:mm");
                return (
                  <li className="inline-flex w-full" key={i}>
                    <div className="inline-flex">
                      <span className="my-auto px-5 text-gray-500">
                        {startTimeToDisplay}
                      </span>
                      <label className={styles.timelineItem}></label>
                    </div>
                    <div
                      key={i}
                      className="rounded-lg bg-amber-100 w-full h-130 w-500 py-3 px-4 my-3 mx-4"
                      onClick={() => openEditTaskModal(i)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className={task.checked ? styles.done : ""}>
                            <span
                              className={
                                styles.label + " text-amber-700 font-semibold"
                              }
                            >
                              {task.name}
                            </span>
                          </div>
                          <div className="inline-flex text-sm text-amber-600">
                            {startTimeToDisplay}
                            <div className="flex my-auto">
                              <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
                            </div>
                            {endTimeToDisplay} ({" "}
                            {Math.floor(
                              (task.endTime - task.startTime) / 60000 / 60,
                            )}{" "}
                            hours{" "}
                            {((task.endTime - task.startTime) / 60000) % 60}{" "}
                            minutes )
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <button
                            className="text-amber-700"
                            onClick={() => {
                              setOneTaskChecked(i);
                            }}
                          >
                            {task.checked ? (
                              <CheckBoxIcon></CheckBoxIcon>
                            ) : (
                              <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div></div>
            <div className="rounded-lg bg-amber-100	box-border h-130 w-500 py-3 px-4 my-3 mx-4">
              <p className="font-semibold text-amber-700">Task Summary</p>
              <ul className="text-amber-600 text-sm font-medium">
                <li className="flex justify-between">
                  <span>Total time</span>
                  <span>{tasks.length}</span>
                </li>
                <li className="flex justify-between">
                  <span>Number of task</span>
                  <span>{tasks.length}</span>
                </li>
                <li className="flex justify-between">
                  <span>Number of finished task</span>
                  <span>
                    {tasks.filter((task) => task.checked).length}/{tasks.length}
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
            className="bg-amber-600 rounded-full text-white text-2xl py-2 px-4 text-2xl w-12 h-12 p-auto"
            onClick={createNewTask}
          >
            +
          </button>
        </div>
        {isEditTaskOpen && (
          <EditTaskModal
            onClose={closeEditTaskModal}
            task={taskIndex !== undefined ? tasks[taskIndex] : defaultTask}
          ></EditTaskModal>
        )}
        {isLoginModalOpen && (
          <AskForLoginModal onClose={closeAskForLoginModal}></AskForLoginModal>
        )}
      </footer>
    </>
  );
}

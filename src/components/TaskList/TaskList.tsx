import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { getTaskByDate } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { loadTasksReducer } from "@/store/taskSlice";
import { useAppSelector } from "@/store/hooks";
import EditTaskModal from "../modal/editTask/EditTaskModal";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingModal from "@/components/modal/setting/SettingModal";
import { auth } from "@/firebase/firebase";
import AskForLoginModal from "../modal/login/AskForLoginModal";
import { User } from "firebase/auth";
import TaskItem from "../taskItem/TaskItem";
import ColorPaletteModal from "../modal/setting/colorPalette/ColorPaletteModal";
import CalendarModal from "../modal/setting/calendar/CalendarModal";

export default function TaskList() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [date, setDate] = useState<Date>();
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const tasks = useAppSelector((state) => state.task.value);

  const nextRoundedTime = (date: Date) => {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0, 0, 0);
    return date.getTime();
  };
  const [defaultTask, setDefaultTask] = useState({
    name: "",
    startTime: nextRoundedTime(new Date()),
    endTime: nextRoundedTime(new Date()),
    description: "",
    checked: false,
    subtasks: [],
    userId: "",
  });
  const addOneDay = (date: Date) => {
    const _date = new Date(date);
    _date.setDate(date.getDate() + 1);
    setDate(_date);
  };

  const minusOneDay = (date: Date) => {
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

  const openSettingModal = () => {
    setIsSettingOpen(true);
  };

  const closeSettingModal = () => {
    setIsSettingOpen(false);
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

  useEffect(() => {
    setDate(new Date());
    auth.onAuthStateChanged((user) => {
      setUser(user);
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
    if (isCalendarOpen || isEditTaskOpen || isLoginModalOpen || isSettingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCalendarOpen, isEditTaskOpen, isLoginModalOpen, isSettingOpen]);

  return (
    <>
      <div>
        <header>
          <div className="inline-flex w-full justify-between lg:px-8 md:px-4">
            <div className="text-2xl my-auto">
              <button
                className="text-primary px-2"
                onClick={() => minusOneDay(date!)}
              >
                &#10094;
              </button>
              {date?.toLocaleString("default", { month: "long" })}
              &ensp;
              {date?.getDate().toLocaleString()}
              <span className="text-primary px-2">{date?.getFullYear()}</span>
              <button
                className="text-primary pr-2"
                onClick={() => addOneDay(date!)}
              >
                &#10095;
              </button>
            </div>
            <div className="m-4 flex gap-2">
              <button className="text-primary" onClick={openCalendarModal}>
                <EditCalendarOutlinedIcon fontSize="medium"></EditCalendarOutlinedIcon>
              </button>
              <button className="text-primary" onClick={openSettingModal}>
                <SettingsOutlinedIcon></SettingsOutlinedIcon>
              </button>
            </div>
          </div>
        </header>
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
                    <span>{tasks.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Number of task</span>
                    <span>{tasks.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Number of finished task</span>
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
        {isCalendarOpen && (
          <CalendarModal
            defaultDate={date!}
            onClose={closeCalendarModal}
            onDateChange={onDateChange}
          />
        )}
        {isSettingOpen && (
          <SettingModal
            onClose={closeSettingModal}
            openColorPaletteModal={() => setIsColorPaletteOpen(true)}
          ></SettingModal>
        )}
        {isEditTaskOpen && (
          <EditTaskModal
            onClose={closeEditTaskModal}
            task={taskIndex !== undefined ? tasks[taskIndex] : defaultTask}
          ></EditTaskModal>
        )}
        {isLoginModalOpen && (
          <AskForLoginModal onClose={closeAskForLoginModal}></AskForLoginModal>
        )}
        {isColorPaletteOpen && (
          <ColorPaletteModal
            onClose={() => setIsColorPaletteOpen(false)}
          ></ColorPaletteModal>
        )}
      </div>
    </>
  );
}

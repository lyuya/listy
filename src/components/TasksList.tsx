import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import EditTaskModal from "@/components/EditTaskModal";
import CalendarModal from "@/components/CalendarModal";
import { getTaskByDate, updateTask } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { loadTasksReducer, toggleTaskReducer } from "@/store/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Task } from "@/types/task";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function TasksList() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.task.value);
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
  };
  const addOneDay = () => {
    let _date = new Date(date);
    _date.setDate(date.getDate() + 1);
    setDate(_date);
  };

  const minusOneDay = () => {
    let _date = new Date(date);
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
    openCreateTaskModal();
  };

  const openCreateTaskModal = () => {
    setIsEditTaskOpen(true);
  };

  const getTasks = async () => {
    try {
      const taskData = await getTaskByDate(date);
      dispatch(loadTasksReducer(taskData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      setLoading(false);
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
  }, [date]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header>
        <div className="inline-flex w-full justify-between px-8">
          <div className="text-2xl p-5">
            <button className="text-matcha px-2" onClick={minusOneDay}>
              &#10094;
            </button>
            {date.toLocaleString("default", { month: "long" })}
            &ensp;
            {date.getDate().toLocaleString()}
            <span className="text-matcha px-2">{date.getFullYear()}</span>
            <button className="text-matcha pr-2" onClick={addOneDay}>
              &#10095;
            </button>
          </div>
          <div className="m-4">
            <button onClick={openCalendarModal}>
              <img className="h-8 w-8" src="schedule.png"></img>
            </button>
          </div>
          {isCalendarOpen && (
            <CalendarModal
              defaultDate={date}
              onClose={closeCalendarModal}
              onDateChange={onDateChange}
            />
          )}
        </div>
      </header>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 ">
          <div className="col-span-2" id="taskList">
            {tasks.map((task, i) => {
              const startTimeToDisplay = dayjs(task.startTime).format("HH:mm");
              const endTimeToDisplay = dayjs(task.endTime).format("HH:mm");
              return (
                <div
                  key={i}
                  className="rounded-lg bg-stone-100	box-border h-130 w-500 p-4 border-2 m-4"
                  onClick={() => openEditTaskModal(i)}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="pb-2 font-semibold">{task.name}</div>
                      <div className="inline-flex text-sm text-matcha">
                        {startTimeToDisplay}
                        <div className="flex my-auto">
                          <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
                        </div>
                        {endTimeToDisplay} ({" "}
                        {Math.floor(
                          (task.endTime - task.startTime) / 60000 / 60,
                        )}{" "}
                        hours {((task.endTime - task.startTime) / 60000) % 60}{" "}
                        minutes )
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOneTaskChecked(i);
                      }}
                    >
                      {task.checked ? (
                        <CheckBoxIcon
                          sx={{ color: "var(--matcha)" }}
                        ></CheckBoxIcon>
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          sx={{ color: "var(--matcha)" }}
                        ></CheckBoxOutlineBlankIcon>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div></div>
            <div className="rounded-lg bg-stone-100	box-border h-130 w-500 p-4 border-2 m-4">
              <p className="font-semibold">Task Summary</p>
              <ul>
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
      <footer className="fixed w-full bottom-10">
        <div className="px-8 float-right	">
          <button
            className="bg-lime-800 rounded-full text-white text-2xl py-2 px-4 text-2xl w-12 h-12 p-auto"
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
      </footer>
    </>
  );
}

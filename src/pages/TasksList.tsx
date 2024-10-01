import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import EditTaskModal from "@/components/EditTaskModal";
import CalendarModal from "@/components/CalendarModal";
import { getTaskByDate } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { loadTasksReducer } from "@/store/taskSlice";
import { useAppSelector } from "@/store/hooks";

export default function TasksList() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [taskIndex, setTaskIndex] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const tasks = useAppSelector((state) => state.task.value);
  const defaultTask = {
    name: "",
    start_time: undefined,
    finished_time: undefined,
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

  useEffect(() => {
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

    getTasks();
  }, [date]);

  if (loading) {
    // TODO add a better loader
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
          <div className="col-span-2">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="rounded-lg bg-stone-100	box-border h-130 w-500 p-4 border-2 m-4 grid grid-cols-3 gap-2"
                onClick={() => openEditTaskModal(i)}
              >
                <div className="col-span-2">
                  <p className="pb-2 font-semibold">{task.name}</p>
                  <p>
                    {/* {task.duration_hour} hours {task.duration_minute} minutes */}
                  </p>
                  {/* <div className="flex">
                        <input type="number" min="0" className="block w-24 rounded-l-lg border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:none sm:text-sm sm:leading-6 focus:outline-none" placeholder="hours"></input>
                        <div className="flex bg-white	border-0 pl-2 pr-2 border-y border-gray-300"><div className="my-auto">hours</div></div>
                        <input type="number" min="0" className="block w-24 border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:none sm:text-sm sm:leading-6 focus:outline-none" placeholder="minutes"></input>
                        <div className="flex bg-white	border-0 rounded-r-lg pl-2 pr-4 border-y border-r border-gray-300	"><div className="my-auto">minutes</div></div>
                      </div> */}
                </div>
                <div>
                  {task.finished_time ? (
                    <p className="text-sm text-gray-500	">
                      {/* Finished at {task.finished_time.toUTCString()} */}
                    </p>
                  ) : (
                    <button>
                      <img src="check.png"></img>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div></div>
            <div className="rounded-lg bg-stone-100	box-border h-130 w-500 p-4 border-2 m-4">
              <p className="font-semibold">Task Summary</p>
              <p>Planed duration time</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="px-8 float-right	">
          <button
            className="bg-lime-800 rounded-full text-white py-2 px-4"
            onClick={createNewTask}
          >
            {" "}
            +{" "}
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

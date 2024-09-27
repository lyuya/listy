import localFont from "next/font/local";
import { Task } from "./types/task";
import React, { useState } from 'react';
import { Dayjs } from "dayjs";
import CalendarModal from "./components/CalendarModal";
import EditTaskModal from "./components/EditTaskModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const tasks: Task[] = [
  {
    name: 'Create react project',
    duration_hour: 2,
    duration_minute: 45,
    start_time: new Date('2024-09-15T10:34:00'),
    finished_time: new Date('2024-09-15T12:34:00'),
    description: '',
    checked: false,
    subtasks: []
  },
  {
    name: 'Correct CV',
    duration_hour: 1,
    duration_minute: 55,
    start_time: new Date('2024-09-15T12:34:00'),
    finished_time: new Date('2024-09-15T15:34:00'),
    description: '',
    checked: false,
    subtasks: []
  },
  {
    name: '3000m run',
    duration_hour: 3,
    duration_minute: 45,
    start_time: new Date('2024-09-15T12:34:00'),
    finished_time: new Date('2024-09-15T17:34:00'),
    description: '',
    checked: false,
    subtasks: []
  }
];

export default function Home() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [task, setTask] = useState<Task>();

  const [date, setDate] = useState<Date>(new Date());

  const addOneDay = () => {
    let _date = new Date(date);
    _date.setDate(date.getDate() + 1)
    setDate(_date);
  }

  const minusOneDay = () => {
    let _date = new Date(date);
    _date.setDate(date.getDate() - 1)
    setDate(_date);
  }


  const openCalendarModal = () => {
    setIsCalendarOpen(true);
  };

  const closeCalendarModal = () => {
    setIsCalendarOpen(false);
  };

  const openEditTaskModal = (task?: Task) => {
    setIsEditTaskOpen(true);
    setTask(task);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskOpen(false);
    setTask(undefined);
  };

  const onDateChange = (newDate: Dayjs) => {
    console.log(newDate.toDate())
    setDate(newDate.toDate())
  }

  return (
    <>
        <header>
          <div className="inline-flex w-full justify-between px-8">
            <div className="text-2xl p-5">
              <button className="text-matcha px-2" onClick={minusOneDay}>&#10094;</button>              
              {date.toLocaleString('default', { month: 'long' })}
              &ensp;
              {date.getDate().toLocaleString()}
              <span className="text-matcha px-2">{date.getFullYear()}</span>
              <button className="text-matcha pr-2" onClick={addOneDay}>&#10095;</button>
            </div>
            <div className="m-4"><button onClick={openCalendarModal}><img className="h-8 w-8" src="schedule.png"></img></button></div>
            <CalendarModal defaultDate={date} isVisible={isCalendarOpen} onClose={closeCalendarModal} onDateChange={onDateChange} />
          </div>
        </header>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="col-span-2">
              {tasks.map((task, i) => 
                <div key={i} className="rounded-lg bg-stone-100	box-border h-130 w-500 p-4 border-2 m-4 grid grid-cols-3 gap-2" onClick={() => openEditTaskModal(task)}>
                  <div className="col-span-2">
                    <p className="pb-2 font-semibold">{task.name}</p>
                    <p>{task.duration_hour} hours {task.duration_minute} minutes</p>
                    {/* <div className="flex">
                      <input type="number" min="0" className="block w-24 rounded-l-lg border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:none sm:text-sm sm:leading-6 focus:outline-none" placeholder="hours"></input>
                      <div className="flex bg-white	border-0 pl-2 pr-2 border-y border-gray-300"><div className="my-auto">hours</div></div>
                      <input type="number" min="0" className="block w-24 border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:none sm:text-sm sm:leading-6 focus:outline-none" placeholder="minutes"></input>
                      <div className="flex bg-white	border-0 rounded-r-lg pl-2 pr-4 border-y border-r border-gray-300	"><div className="my-auto">minutes</div></div>
                    </div> */}
                  </div>
                  <div>
                  {task.finished_time ? <p className="text-sm text-gray-500	">Finished at {task.finished_time.toUTCString()}</p> : <button><img src="check.png"></img></button>}
                  </div>
                </div>
              )}
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
            <button className="bg-lime-800 rounded-full text-white py-2 px-4" onClick={openEditTaskModal}>+</button>
          </div>
          <EditTaskModal isVisible={isEditTaskOpen} onClose={closeEditTaskModal} value={task}></EditTaskModal>
        </footer>
    </>
  );
}

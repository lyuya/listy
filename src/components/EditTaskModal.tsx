import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";
import { ChangeEvent, useMemo, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Subtask, Task } from "@/types/task";
import { customDatePicker, customDigitalClockSectionItem } from "@/styles/CustomStyle";
import { updateTask } from "@/api/task.service";

interface EditTaskModalProps {
  task: Task;
  onClose: () => {};
}

export default function EditTaskModal({
  task: initialTask,
  onClose,
}: EditTaskModalProps) {
  let [task, setTask] = useState({ ...initialTask });
  let [checked, setChecked] = useState(initialTask.checked);

  const startDate = useMemo(() => dayjs(task.start_time), [task.start_time]);
  const finishedDate = useMemo(
    () => dayjs(task.finished_time),
    [task.finished_time],
  );
  const saveNewTask = (taskEdited: Task) => {
    updateTask(taskEdited);
    onClose();
  };
  const createNewSubtask = () => {
    let newSubtask: Subtask = {
      name: "",
      checked: false,
    };

    setTask({ ...task, subtasks: [...task.subtasks, newSubtask] });
  };

  const setSubtaskName = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const subtask = {
      ...task.subtasks[i],
      name: e.target.value,
    };
    const taskCloned = { ...task };
    taskCloned.subtasks[i] = subtask;
    setTask(taskCloned);
  };

  const setSubtaskChecked = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const subtask = {
      ...task.subtasks[i],
      checked: e.target.checked,
    };
    const taskCloned = { ...task };
    taskCloned.subtasks[i] = subtask;
    setTask(taskCloned);
  };

  const deleteSubtask = (i: number) => {
    const taskCloned = { ...task };
    taskCloned.subtasks.splice(i, 1);
    setTask(taskCloned);
  };

  const setDescription = (description: string) => {
    const taskCloned = { ...task };
    taskCloned.description = description;
    setTask(taskCloned);
  };

  const setTaskName = (name: string) => {
    const taskCloned = { ...task };
    taskCloned.name = name;
    setTask(taskCloned);
  };

  const setTaskChecked = () => {
    const taskCloned = { ...initialTask };
    taskCloned.checked = !taskCloned.checked;
    setChecked(taskCloned.checked);
    updateTask(taskCloned);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div
          className="modal-content w-3/6 bg-[#e0ebd6]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b-1">
            <span className="font-bold text-matcha text-xl">Edit task</span>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="bg-[#e0ebd6] py-5">
            <div className="pb-2">
              <input
                className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                placeholder="Task name"
                value={task.name}
                onChange={(e) => setTaskName(e.target.value)}
              ></input>
            </div>
            <div className="inline-flex gap-1 pb-2">
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    slotProps={{
                      ...customDatePicker,
                      textField: { size: "small" },
                    }}
                  />
                  <TimePicker
                    value={startDate}
                    slotProps={{
                      textField: { size: "small" },
                      actionBar: { actions: [] },
                    }}
                  />
                  <div className="my-auto">
                    <ArrowForwardIcon></ArrowForwardIcon>
                  </div>
                  <TimePicker
                    value={finishedDate}
                    slotProps={{
                      textField: { size: "small" },
                      actionBar: { actions: [] },
                      digitalClockSectionItem: {
                        ...customDigitalClockSectionItem,
                      },
                    }}
                  />
                </LocalizationProvider>
              </>
            </div>
            <div>
              <div>
                {task.finished_time ? (
                  <p className="text-sm text-gray-500	">
                    Duration:{" "}
                    {(task.finished_time.getTime() -
                      task.start_time.getTime()) /
                      60000}
                  </p>
                ) : (
                  <button>
                    <img src="check.png"></img>
                  </button>
                )}
              </div>
            </div>
            <div className="min-h-40 grid grid-cols-2 divide-x divide-white ">
              <div className="w-full">
                <div className="w-full p-2 inline-flex justify-between">
                  <span className="font-bold text-matcha items-center flex">
                    Subtasks
                  </span>
                  &ensp;
                  <button
                    className="px-3 py-1 h-fit bg-matcha text-white rounded-full text-sm"
                    onClick={createNewSubtask}
                  >
                    + add a subtask
                  </button>
                </div>
                <ul>
                  {task.subtasks.map((subtask, i) => (
                    <li key={i}>
                      <div className="">
                        <label>
                          <input
                            checked={subtask.checked}
                            onChange={(e) => setSubtaskChecked(e, i)}
                            className="accent-green-700 mr-2"
                            type="checkbox"
                          />
                          <input
                            value={subtask.name}
                            onChange={(e) => setSubtaskName(e, i)}
                            className="appearance-none border-2 border-gray-200 rounded-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                          ></input>
                          <button
                            className="rounded-full text-white py-1 px-1"
                            onClick={() => deleteSubtask(i)}
                          >
                            <DeleteOutlineIcon
                              fontSize="small"
                              sx={{ color: "var(--matcha)" }}
                            ></DeleteOutlineIcon>
                          </button>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2">
                <textarea
                  rows={10}
                  className="appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white resize-none h-20"
                  placeholder="Description..."
                  value={task.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div>
                <button onClick={setTaskChecked}>
                  {checked && <TaskAltIcon></TaskAltIcon>}
                  {!checked && (
                    <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>
                  )}
                </button>
              </div>
              <div className="flex items-end gap-1">
                <button
                  className="px-3 py-1 bg-matcha text-white rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                >
                  cancel
                </button>
                <button
                  className="px-3 py-1 bg-matcha text-white rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveNewTask(task);
                  }}
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

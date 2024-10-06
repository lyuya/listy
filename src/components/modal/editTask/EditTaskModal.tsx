import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useMemo, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Subtask, Task } from "@/types/task";
import {
  customCssTextField,
  customDatePicker,
  customDigitalClockSectionItem,
} from "@/styles/CustomStyle";
import { deleteTask, updateTask } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { toggleTaskReducer } from "@/store/taskSlice";
import DeleteConfirmationModal from "../deleteConfirmation/DeleteConfirmationModal";
import styles from "./EditTaskModal.module.css";
import { auth } from "@/firebase/firebase";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
}

export default function EditTaskModal({
  task: initialTask,
  onClose,
}: EditTaskModalProps) {
  const [task, setTask] = useState({ ...initialTask });
  const [checked, setChecked] = useState(initialTask.checked);
  const [
    isDeleteConfirmationModalVisible,
    setisDeleteConfirmationModalVisible,
  ] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startTimePickerOpen, setStartTimePickerOpen] = useState(false);
  const [endTimePickerOpen, setEndTimePickerOpen] = useState(false);

  const dispatch = useDispatch();
  const startDate: Dayjs = useMemo(() => {
    return dayjs(task.startTime);
  }, [task.startTime]);

  const finishedDate = useMemo(() => {
    if (task.endTime) return dayjs(task.endTime);
  }, [task.endTime]);

  const saveNewTask = (taskEdited: Task) => {
    updateTask(taskEdited).then(
      async () => {
        onClose();
      },
      (error) => {
        console.error("Error updating task:", error);
      },
    );
  };

  const createNewSubtask = () => {
    const newSubtask: Subtask = {
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
    const subtaskList = [...task.subtasks];
    subtaskList[i] = subtask;
    setTask({ ...task, subtasks: subtaskList });
  };

  const setSubtaskChecked = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const subtask = {
      ...task.subtasks[i],
      checked: e.target.checked,
    };
    const subtaskList = [...task.subtasks];
    subtaskList[i] = subtask;
    setTask({ ...task, subtasks: subtaskList });
  };

  const deleteSubtask = (i: number) => {
    const subtaskList = [...task.subtasks];
    subtaskList.splice(i, 1);
    setTask({ ...task, subtasks: subtaskList });
  };

  const setDescription = (description: string) => {
    const taskCloned = { ...task };
    taskCloned.description = description;
    setTask(taskCloned);
  };

  const setTaskDate = (date: Dayjs | null) => {
    if (!date) {
      return;
    }
    const taskCloned = { ...task };
    const dateWithStartTimeUpdated = new Date(taskCloned.startTime);
    const dateWithEndTimeUpdated = new Date(taskCloned.endTime);
    dateWithStartTimeUpdated.setFullYear(
      date.year(),
      date.month(),
      date.date(),
    );
    dateWithEndTimeUpdated.setFullYear(date.year(), date.month(), date.date());

    taskCloned.startTime = dateWithStartTimeUpdated.getTime();
    taskCloned.endTime = dateWithEndTimeUpdated.getTime();
    setTask(taskCloned);
  };

  const setTime = (
    task: Task,
    newTime: Dayjs,
    field: "startTime" | "endTime",
  ) => {
    const taskCloned = { ...task };
    const dateWithTimeUpdated = new Date(taskCloned[field]);
    dateWithTimeUpdated.setHours(newTime.hour(), newTime.minute(), 0, 0);
    taskCloned[field] = dateWithTimeUpdated.getTime();
    return taskCloned;
  };

  const setStartTime = (date: Dayjs | null) => {
    if (!date) {
      return;
    }
    let taskUpdated = setTime(task, date, "startTime");
    if (date.valueOf() > task.endTime) {
      taskUpdated = setTime(taskUpdated, date, "endTime");
    }
    setTask(taskUpdated);
  };

  const setEndTime = (date: Dayjs | null) => {
    if (!date) {
      return;
    }
    let taskUpdated = setTime(task, date, "endTime");
    if (task.startTime > date.valueOf()) {
      taskUpdated = setTime(taskUpdated, date, "startTime");
    }
    setTask(taskUpdated);
  };

  const setTaskName = (name: string) => {
    const taskCloned = { ...task };
    taskCloned.name = name;
    setTask(taskCloned);
  };

  const setTaskChecked = () => {
    // create a copy of task with only new value of checked
    const initialTaskCloned = { ...initialTask };
    initialTaskCloned.checked = !initialTaskCloned.checked;
    setChecked(initialTaskCloned.checked);
    // update also the new value of checked in task state
    const taskCloned = { ...task };
    taskCloned.checked = initialTaskCloned.checked;
    setTask(taskCloned);

    updateTask(initialTaskCloned).then(
      () => {
        dispatch(toggleTaskReducer(initialTaskCloned));
      },
      (error) => console.error("Error updating task:", error),
    );
  };

  const openDeleteConfirmationModal = () => {
    setisDeleteConfirmationModalVisible(true);
  };

  const deleteCurrentTask = (confirmation: boolean) => {
    if (!confirmation || !task.id) {
      setisDeleteConfirmationModalVisible(false);
      return;
    }

    deleteTask(task.id).then(
      () => {
        setisDeleteConfirmationModalVisible(false);
        onClose();
      },
      (error) => console.error("Error updating task:", error),
    );
  };

  const setUserId = () => {
    if (!task.userId && auth.currentUser?.uid) {
      const taskCloned = { ...task };
      taskCloned.userId = auth.currentUser?.uid;
      setTask(taskCloned);
    }
  };
  setUserId();

  return (
    <>
      <div
        className="modal-backdrop dark overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div
          className="modal-content w-3/6 bg-white"
          onClick={(e) => {
            e.stopPropagation();
            setDatePickerOpen(false);
            setStartTimePickerOpen(false);
            setEndTimePickerOpen(false);
          }}
        >
          <div className="border-b-1">
            <span className="font-bold text-primary text-xl">
              {task.id ? "Edit task" : "New task"}
            </span>
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="bg-transparent py-5 max-h-96 overflow-auto">
            <div className="pb-2">
              <input
                className="appearance-none border border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                placeholder="Task name"
                value={task.name}
                onChange={(e) => setTaskName(e.target.value)}
              ></input>
            </div>
            <div className="inline-flex gap-1 pb-2 relative">
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DatePicker
                      open={datePickerOpen}
                      onOpen={() => {
                        setDatePickerOpen(true);
                        setEndTimePickerOpen(false);
                        setStartTimePickerOpen(false);
                      }}
                      onClose={() => setDatePickerOpen(false)}
                      value={startDate}
                      slotProps={{
                        ...customDatePicker,
                        textField: { size: "small" },
                      }}
                      sx={{ ...customCssTextField }}
                      onChange={(date) => setTaskDate(date)}
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <TimePicker
                      value={startDate}
                      open={startTimePickerOpen}
                      onOpen={() => {
                        setStartTimePickerOpen(true);
                        setEndTimePickerOpen(false);
                        setDatePickerOpen(false);
                      }}
                      onClose={() => setStartTimePickerOpen(false)}
                      ampm={false}
                      slotProps={{
                        ...customDigitalClockSectionItem,
                        textField: { size: "small" },
                        actionBar: { actions: [] },
                      }}
                      onChange={(date) => setStartTime(date)}
                      sx={{ ...customCssTextField }}
                    />
                  </div>
                  <div className="my-auto">
                    <ArrowForwardIcon></ArrowForwardIcon>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <TimePicker
                      open={endTimePickerOpen}
                      onOpen={() => {
                        setEndTimePickerOpen(true);
                        setStartTimePickerOpen(false);
                        setDatePickerOpen(false);
                      }}
                      onClose={() => setEndTimePickerOpen(false)}
                      ampm={false}
                      className="picker"
                      value={finishedDate}
                      slotProps={{
                        ...customDigitalClockSectionItem,
                        textField: { size: "small" },
                        actionBar: { actions: [] },
                      }}
                      onChange={(date) => {
                        setEndTime(date);
                      }}
                      sx={{ ...customCssTextField }}
                    />
                  </div>
                </LocalizationProvider>
              </>
            </div>
            <div className="px-2 text-sm">
              <p>
                {Math.floor((task.endTime - task.startTime) / 60000 / 60)} hours{" "}
                {((task.endTime - task.startTime) / 60000) % 60} minutes
              </p>
            </div>
            <div className="min-h-40 lg:grid lg:grid-cols-2 ">
              <div className="w-full">
                <div className="w-full p-3 inline-flex justify-between">
                  <span className="font-bold text-primary justify-center flex">
                    Subtasks
                  </span>
                  &ensp;
                  <button
                    className="px-3 py-1 h-fit bg-primary text-white rounded-full text-sm"
                    onClick={createNewSubtask}
                  >
                    + add a subtask
                  </button>
                </div>
                <ul className="p-3">
                  {task.subtasks.map((subtask, i) => (
                    <li key={i}>
                      <div className="">
                        <div className="w-full flex rounded-md border border-primary mb-2 px-2">
                          <div className="flex relative w-full">
                            <input
                              checked={subtask.checked}
                              onChange={(e) => setSubtaskChecked(e, i)}
                              className="accent-primary mr-2"
                              type="checkbox"
                            />
                            <input
                              value={subtask.name}
                              onChange={(e) => setSubtaskName(e, i)}
                              className={
                                "appearance-none w-full py-1 px-1 leading-tight focus:outline-none focus:bg-white" +
                                (subtask.checked ? styles.done : "")
                              }
                            ></input>
                          </div>
                          <button
                            className="rounded-full text-primary hover:bg-light p-1 w-8"
                            onClick={() => deleteSubtask(i)}
                          >
                            <DeleteOutlineIcon fontSize="small"></DeleteOutlineIcon>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3">
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
                <div className="flex gap-2 text-primary">
                  <button
                    className="hover:bg-light rounded-full p-2"
                    onClick={setTaskChecked}
                  >
                    {checked && <TaskAltIcon></TaskAltIcon>}
                    {!checked && (
                      <RadioButtonUncheckedIcon></RadioButtonUncheckedIcon>
                    )}
                  </button>
                  <button
                    className="hover:bg-light rounded-full p-2"
                    onClick={openDeleteConfirmationModal}
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>
                  </button>
                </div>

                {isDeleteConfirmationModalVisible && (
                  <DeleteConfirmationModal
                    onClose={deleteCurrentTask}
                  ></DeleteConfirmationModal>
                )}
              </div>
              <div className="flex items-end gap-1">
                <button
                  className="px-3 py-1 bg-primary text-white rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                >
                  cancel
                </button>
                <button
                  className="px-3 py-1 bg-primary text-white rounded-md"
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

import { Task } from "@/types/task";
import dayjs from "dayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import styles from "./TaskItem.module.css";
import { updateTask } from "@/api/task.service";
import { useDispatch } from "react-redux";
import { toggleTaskReducer } from "@/store/taskSlice";

interface TaskItemProps {
  task: Task;
  openEditTaskModal: () => void;
}

export default function TaskItem({ task, openEditTaskModal }: TaskItemProps) {
  const dispatch = useDispatch();
  const startTimeToDisplay = dayjs(task.startTime).format("HH:mm");
  const endTimeToDisplay = dayjs(task.endTime).format("HH:mm");

  const openTaskModal = () => {
    openEditTaskModal();
  };

  const setOneTaskChecked = () => {
    const taskCloned = { ...task };
    taskCloned.checked = !taskCloned.checked;
    updateTask(taskCloned).then(
      () => {
        dispatch(toggleTaskReducer(taskCloned));
      },
      (error) => console.error("Error updating task:", error),
    );
  };
  return (
    <li className="inline-flex w-full">
      <div className="inline-flex">
        <span className="my-auto px-5 text-gray-500">{startTimeToDisplay}</span>
        <label className={styles.timelineItem}></label>
      </div>
      <div
        className="rounded-lg bg-light w-full h-130 w-500 py-3 px-4 my-3 mx-4"
        onClick={() => openTaskModal()}
      >
        <div className="flex justify-between">
          <div>
            <div className={task.checked ? styles.done : ""}>
              <span className={styles.label + " text-primary font-semibold"}>
                {task.name}
              </span>
            </div>
            <div className="block sm:inline-flex text-sm text-primary">
              <div className="inline-flex">
                {startTimeToDisplay}
                <div className="flex my-auto">
                  <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
                </div>
                {endTimeToDisplay}
              </div>
              <div>
                ( {Math.floor((task.endTime - task.startTime) / 60000 / 60)}{" "}
                hours {((task.endTime - task.startTime) / 60000) % 60} minutes )
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="text-primary"
              onClick={() => {
                setOneTaskChecked();
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
}

import { Task } from "../../../types/task";
import { fireEvent, render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import EditTaskModal from "./EditTaskModal";

const closeEditTaskModalMock = vi.fn();
const dispatchMock = vi.fn();
const updateTaskMock = vi.fn().mockResolvedValue(() => {});

const task1: Task = {
  name: "First task",
  startTime: new Date(2000, 1, 1, 13).getTime(),
  endTime: new Date(2000, 1, 1, 17).getTime(),
  checked: false,
  description: "",
  subtasks: [],
  userId: "",
  id: "id",
};

const task2: Task = {
  name: "First task",
  startTime: new Date(2000, 1, 1, 13).getTime(),
  endTime: new Date(2000, 1, 1, 17).getTime(),
  checked: false,
  description: "",
  subtasks: [],
  userId: "",
};
const dom = render(
  <EditTaskModal onClose={closeEditTaskModalMock} task={task1}></EditTaskModal>,
);

vi.mock("../../../firebase/firebase", () => ({
  auth: {},
  db: {},
}));
vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));
vi.mock("../../../api/task.service", () => ({
  updateTask: (taskEdit: Task) => updateTaskMock(taskEdit),
}));

test("modal name is <Edit task>", () => {
  expect(dom.getByText("Edit task")).toBeDefined();
});

test("add subtask button", () => {
  const buttonSubtask = dom.getByText("+ Add Subtask");
  fireEvent.click(buttonSubtask);
  expect(dom.container.querySelectorAll("li")!.length).toBe(1);
  fireEvent.click(buttonSubtask);
  expect(dom.container.querySelectorAll("li")!.length).toBe(2);
});

test("save button send the object correctly", () => {
  const saveButton = dom.getByText("save");
  fireEvent.click(saveButton);
  const taskToBeSaved: Task = {
    ...task1,
    subtasks: [
      { name: "", checked: false },
      { name: "", checked: false },
    ],
  };
  expect(updateTaskMock).toBeCalledWith(taskToBeSaved);
});

test("modal name is <New task>", () => {
  const dom = render(
    <EditTaskModal
      onClose={closeEditTaskModalMock}
      task={task2}
    ></EditTaskModal>,
  );
  expect(dom.getByText("New task")).toBeDefined();
});

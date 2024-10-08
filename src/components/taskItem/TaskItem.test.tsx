import { Task } from "@/types/task";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TaskItem from "./TaskItem";

const dispatchMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));
vi.mock("../../api/task.service", () => ({
  updateTask: () => Promise.resolve(),
}));

const task: Task = {
  name: "First task",
  startTime: new Date(2000, 1, 1, 13).getTime(),
  endTime: new Date(2000, 1, 1, 17).getTime(),
  checked: true,
  description: "",
  subtasks: [],
  userId: "",
};
const dom = render(<TaskItem task={task} openEditTaskModal={() => {}} />);

test("display task name", () => {
  expect(screen.getByText("First task")).toBeDefined();
});

test("display task duration", () => {
  expect(screen.getByText(/4 hours 0 minutes/)).toBeDefined();
});

test("display checkbox checked", () => {
  expect(screen.getByTestId("CheckBoxIcon")).toBeDefined();
});

test("display empty checkbox after checked", async () => {
  expect(screen.getByTestId("CheckBoxIcon")).toBeDefined();
  const button = dom.container.querySelector("#checked");
  fireEvent.click(button!);
  await vi.advanceTimersByTimeAsync(100);
  expect(dispatchMock).toBeCalledTimes(1);
});

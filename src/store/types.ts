import { Task } from "@/types/task";

// Action types
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface RemoveTaskAction {
  type: typeof REMOVE_TASK;
  payload: number;
}

interface ToggleTaskAction {
  type: typeof TOGGLE_TASK;
  payload: number;
}

export type TodoActionTypes =
  | AddTaskAction
  | RemoveTaskAction
  | ToggleTaskAction;

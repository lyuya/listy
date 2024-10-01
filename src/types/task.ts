export interface Task {
  id?: string;
  name: string;
  start_time?: number;
  finished_time?: number;
  description: string;
  checked: boolean;
  subtasks: Subtask[];
}
export interface Subtask {
  name: string;
  checked: boolean;
}

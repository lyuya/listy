export interface Task {
  id: string;
  name: string;
  start_time: Date;
  finished_time: Date;
  description: string;
  checked: boolean;
  subtasks: Subtask[];
}
export interface Subtask {
  name: string;
  checked: boolean;
}

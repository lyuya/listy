export interface Task {
  id?: string;
  name: string;
  startTime: number;
  endTime: number;
  description: string;
  checked: boolean;
  subtasks: Subtask[];
}
export interface Subtask {
  name: string;
  checked: boolean;
}

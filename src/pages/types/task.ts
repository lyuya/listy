export interface Task {
  name: string;
  start_time: Date;
  finished_time: Date;
  duration_hour: number;
  duration_minute: number;
  description: string;
  checked: boolean;
  subtasks: [];
}

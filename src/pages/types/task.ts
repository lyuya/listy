export interface Task {
    name: string,
    created_date: Date,
    finished_date?: Date,
    duration_hour: number,
    duration_minute: number,
    task_cloned?: boolean,
}
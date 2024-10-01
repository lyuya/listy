import { Task } from "@/types/task";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  value: Task[];
}
const initialState: TasksState = {
  value: [],
};
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    loadTasksReducer: (state, tasks) => {
      state.value = tasks.payload;
    },
    updateTaskReducer: (state, action) => {
      state.value = state.value.map((task: Task) =>
        task.id === action.payload.id ? { ...action.payload } : task,
      ) as never[];
    },
    deleteTaskReducer: (state, action) => {
      state.value = state.value.filter(
        (task: Task) => task.id !== action.payload.id,
      );
    },
    toggleTaskReducer: (state, action) => {
      state.value = state.value.map((task: Task) =>
        task.id === action.payload.id
          ? { ...task, checked: !task.checked }
          : task,
      ) as never[];
    },
  },
});

export const {
  loadTasksReducer,
  updateTaskReducer,
  deleteTaskReducer,
  toggleTaskReducer,
} = taskSlice.actions;

export default taskSlice.reducer;

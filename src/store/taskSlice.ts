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
    loadTasksReducer: (state, action) => {
      state.value = action.payload;
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
      );
    },
  },
});

export const { loadTasksReducer, deleteTaskReducer, toggleTaskReducer } =
  taskSlice.actions;
export default taskSlice.reducer;

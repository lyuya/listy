import { createSlice } from "@reduxjs/toolkit";

interface DateState {
  value: number;
}
const todayDate = new Date().getTime();

const initialState: DateState = {
  value: todayDate,
};
export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    loadDateReducer: (state, action) => {
      state.value = action.payload.getTime();
    },
  },
});

export const { loadDateReducer } = dateSlice.actions;

export default dateSlice.reducer;

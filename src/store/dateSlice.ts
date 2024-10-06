import { createSlice } from "@reduxjs/toolkit";

interface DateState {
  value: Date | undefined;
}
const todayDate = new Date();

const initialState: DateState = {
  value: todayDate,
};
export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    loadDateReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadDateReducer } = dateSlice.actions;

export default dateSlice.reducer;

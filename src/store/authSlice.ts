import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  value: User | undefined;
}
const initialState: AuthState = {
  value: undefined,
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadCurrentUserReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadCurrentUserReducer } = authSlice.actions;

export default authSlice.reducer;

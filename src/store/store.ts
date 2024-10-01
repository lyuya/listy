import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

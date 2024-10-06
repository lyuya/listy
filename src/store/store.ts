import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import dateReducer from "./dateSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
      date: dateReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

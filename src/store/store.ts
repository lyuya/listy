import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredPaths: ["task.start_time", "task.finished_time"],
  },
};
export const makeStore = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(defaultMiddlewareConfig),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

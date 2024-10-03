import React from "react";
import TaskList from "../components/TaskList/TaskList";
import StoreProvider from "@/components/storeProvider/StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <TaskList></TaskList>
    </StoreProvider>
  );
}

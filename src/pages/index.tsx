import React from "react";
import StoreProvider from "@/components/StoreProvider";
import TasksList from "../components/TasksList";

export default function Home() {
  return (
    <>
      <StoreProvider>
        <TasksList></TasksList>
      </StoreProvider>
    </>
  );
}

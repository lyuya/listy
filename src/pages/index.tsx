import React from "react";
import StoreProvider from "@/components/StoreProvider";
import TasksList from "./TasksList";

export default function Home() {
  return (
    <>
      <StoreProvider>
        <TasksList></TasksList>
      </StoreProvider>
    </>
  );
}

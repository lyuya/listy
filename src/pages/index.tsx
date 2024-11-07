import React from "react";
import TaskList from "../components/TaskList/TaskList";
import StoreProvider from "@/components/storeProvider/StoreProvider";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <StoreProvider>
      <TaskList></TaskList>
      <Footer></Footer>
    </StoreProvider>
  );
}

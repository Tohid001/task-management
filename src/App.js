import React from "react";
import { GlobalReset } from "./Global.styled";
import TaskContainer from "./TaskContainer/TaskContainer.js";

function App() {
  return (
    <>
      <GlobalReset />
      <TaskContainer />
    </>
  );
}

export default App;

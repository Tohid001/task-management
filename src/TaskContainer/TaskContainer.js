import React, { useState } from "react";
import AssignTaskForm from "../Form/AssignTaskForm.js";
import Table from "./Table.js";

const initialState = {
  registryTime: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

function TaskContainer() {
  const [taskList, setTaskList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addTask = (e, newTask) => {
    setTaskList((prev) => {
      return [...prev, newTask];
    });
  };

  console.log("taskList", taskList);

  return (
    <>
      <button
        onClick={() => {
          setOpenModal((prev) => {
            return !prev;
          });
        }}
      >
        Assign Task
      </button>
      {openModal && (
        <AssignTaskForm
          submitHandler={addTask}
          initialState={initialState}
          modal={setOpenModal}
        />
      )}
      <Table taskObj={{ taskList, setTaskList }} />
    </>
  );
}

export default TaskContainer;

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

  const deleteHandler = (id, date) => {
    const index = taskList.findIndex((task) => {
      return (
        new Date(`${Object.keys(task)[0]}`).getDate() ===
        new Date(`${date}`).getDate()
      );
    });

    const newTasks = [...taskList];

    const filteredNest = newTasks[index][`${date}`].filter((task) => {
      return !(task.id === id);
    });

    newTasks[index][`${date}`] = filteredNest;

    setTaskList([...newTasks]);
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
      <Table
        deleteHandler={deleteHandler}
        taskObj={{ taskList, setTaskList }}
        submitHandler={addTask}
        initialState={initialState}
        modal={{ openModal, setOpenModal }}
      />
    </>
  );
}

export default TaskContainer;

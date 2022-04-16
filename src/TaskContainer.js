import React, { useState } from "react";
import AssignTaskForm from "./Form/AssignTaskForm.js";
import "./Table.css";

const initialState = { title: "", description: "", startDate: "", endDate: "" };

function TaskContainer() {
  const [taskList, setTaskList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addTask = (e, newTask) => {
    setTaskList((prev) => {
      return [...prev, newTask];
    });
  };

  console.log(taskList);

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
      <table>
        <caption>Items Sold August 2016</caption>
        <thead>
          <tr>
            <th rowspan="2">Date</th>
            <th colspan="5">Task Info</th>
          </tr>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>due date</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
    </>
  );
}

export default TaskContainer;

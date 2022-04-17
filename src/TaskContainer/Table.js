import React, { useState } from "react";
import "./Table.css";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import EditableCell from "./EditableCell.js";
import { TextInput, DateInput } from "../Input/index.js";
import AssignTaskForm from "../Form/AssignTaskForm.js";

function Table({
  submitHandler,
  initialState,
  deleteHandler,
  taskObj: { taskList, setTaskList },
}) {
  const [openModal, setOpenModal] = useState(false);

  const [rT, setRt] = useState();

  console.log("rt", rT);

  const taskInfoFieldUpdateHandler = (id, date, update) => {
    const index = taskList.findIndex((task) => {
      return (
        new Date(`${Object.keys(task)[0]}`).getDate() ===
        new Date(`${date}`).getDate()
      );
    });

    const newTasks = [...taskList];

    const nestIndex = newTasks[index][`${date}`].findIndex((task) => {
      return task.id === id;
    });

    const newNestTasks = [...newTasks[index][`${date}`]];
    newNestTasks[nestIndex] = { ...newNestTasks[nestIndex], ...update };

    newTasks[index][`${date}`] = newNestTasks;

    setTaskList([...newTasks]);
  };

  const addTasktoSpecificRehgistryDate = (date, update) => {
    const index = taskList.findIndex((task) => {
      return (
        new Date(`${Object.keys(task)[0]}`).getDate() ===
        new Date(`${date}`).getDate()
      );
    });

    const newTasks = [...taskList];

    newTasks[index][`${date}`].push(update);

    console.log("heheheheheheh", newTasks[index][`${date}`], date);

    setTaskList([...newTasks]);
  };

  return (
    <>
      <table>
        <caption>Task List</caption>
        <thead>
          <tr>
            <th rowSpan="2">Date</th>
            <th colSpan="6">Task Info</th>
          </tr>
          <tr>
            <th>Task Id</th>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>start Date</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length > 0 &&
            taskList.map((task, id) => {
              return (
                <>
                  <tr>
                    <th
                      id="date"
                      rowSpan={task[Object.keys(task)[0]].length + 1}
                    >
                      {Object.keys(task)[0]}
                      <span
                        onClick={() => {
                          setOpenModal((prev) => !prev);
                          setRt(Object.keys(task)[0]);
                        }}
                      >
                        <AiOutlinePlus />
                      </span>
                      {openModal && (
                        <AssignTaskForm
                          submitHandler={addTasktoSpecificRehgistryDate}
                          initialState={{
                            ...initialState,
                            registryTime: rT,
                          }}
                          modal={setOpenModal}
                          nest={true}
                        />
                      )}
                    </th>
                  </tr>
                  {task[Object.keys(task)[0]].map((nestTask, nestTaskId) => {
                    return (
                      <tr id={nestTaskId}>
                        <td>{nestTask.id}</td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ title: nestTask.title }}
                            value={nestTask.title}
                          >
                            {(options) => {
                              return (
                                <TextInput
                                  {...options}
                                  placeholder="enter title"
                                />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ description: nestTask.description }}
                            value={nestTask.description}
                          >
                            {(options) => {
                              return (
                                <TextInput
                                  {...options}
                                  type="textarea"
                                  placeholder="enter description"
                                />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ startDate: nestTask.endDate }}
                            value={nestTask.startDate}
                          >
                            {(options) => {
                              return (
                                <DateInput type="datetime-local" {...options} />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            date={Object.keys(task)[0]}
                            taskInfoFieldUpdateHandler={
                              taskInfoFieldUpdateHandler
                            }
                            id={nestTask.id}
                            initialState={{ endDate: nestTask.endDate }}
                            value={nestTask.endDate}
                          >
                            {(options) => {
                              return (
                                <DateInput type="datetime-local" {...options} />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td className="actions">
                          <span
                            onClick={() => {
                              deleteHandler(nestTask.id, Object.keys(task)[0]);
                            }}
                          >
                            <AiFillDelete />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default React.memo(Table);

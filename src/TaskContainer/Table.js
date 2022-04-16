import React from "react";
import "./Table.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EditableCell from "./EditableCell.js";
import { TextInput, DateInput } from "../Input/index.js";

function Table({ tasklist }) {
  return (
    <>
      <table>
        <caption>Task List</caption>
        <thead>
          <tr>
            <th rowSpan="2">Date</th>
            <th colSpan="5">Task Info</th>
          </tr>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>due date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasklist.length > 0 &&
            tasklist.map((task, id) => {
              return (
                <>
                  <tr>
                    <th rowSpan={task[Object.keys(task)[0]]?.length + 1}>
                      {Object.keys(task)[0]}
                    </th>
                  </tr>
                  {task[Object.keys(task)[0]]?.map((nestTask, nestTaskId) => {
                    return (
                      <tr id={nestTaskId}>
                        <td>{nestTask.id}</td>
                        <td>
                          <EditableCell
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
                            id={nestTask.id}
                            initialState={{ description: nestTask.description }}
                            value={nestTask.description}
                          >
                            {(options) => {
                              return (
                                <TextInput
                                  {...options}
                                  placeholder="enter description"
                                />
                              );
                            }}
                          </EditableCell>
                        </td>
                        <td>
                          <EditableCell
                            id={nestTask.id}
                            initialState={{ endDate: nestTask.endDate }}
                            value={nestTask.endDate}
                          >
                            {(options) => {
                              return <DateInput {...options} />;
                            }}
                          </EditableCell>
                        </td>
                        <td className="actions">
                          <span onClick={() => {}}>
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

import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import useForm from "../Hooks/useForm.js";
import { IconContainer, SubRow } from "./EditableCell.styled.js";

function EditableCell({
  id,
  initialState,
  value,
  children,
  taskInfoFieldUpdateHandler,
  date,
}) {
  const [isEdit, setEdit] = useState(false);

  const [formstates, setFormstates, onChangeHandler, resetHandler] =
    useForm(initialState);

  // console.log(formstates);

  const options = {
    state: formstates[Object.keys(initialState)[0]],
    onChangeHandler,
    name: Object.keys(initialState)[0],
  };

  // console.log(`${Object.keys(initialState)[0]} field rendered`);

  return (
    <SubRow>
      {!isEdit ? <p>{value}</p> : children(options)}
      <IconContainer
        isEdit={isEdit}
        isAbled={
          !(
            Object.values(initialState)[0].toLowerCase() ===
            Object.values(formstates)[0].toLowerCase()
          )
        }
      >
        {!isEdit ? (
          <button
            onClick={() => {
              setEdit((prev) => {
                return !prev;
              });
            }}
          >
            <AiFillEdit color="blue" size="1rem" />
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setEdit((prev) => {
                  return !prev;
                });
                resetHandler();
              }}
            >
              <GiCancel size="1rem" />
            </button>
            <>
              <button
                disabled={
                  Object.values(initialState)[0].toLowerCase() ===
                  Object.values(formstates)[0].toLowerCase()
                }
                onClick={() => {
                  setEdit((prev) => {
                    return !prev;
                  });
                  taskInfoFieldUpdateHandler(id, date, formstates);
                  // console.log(taskInfoFieldUpdateHandler);
                }}
              >
                <AiFillSave size="1rem" />
              </button>
            </>
          </>
        )}
      </IconContainer>
    </SubRow>
  );
}

export default EditableCell;

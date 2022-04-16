import React from "react";
import useForm from "../Hooks/useForm.js";
import { v4 } from "uuid";
import { TextInput, DateInput } from "../Input/index.js";

import {
  OuterMost,
  FormContainer,
  TextInputContainer,
  ButtonContainer,
} from "./Form.styled.js";

function Form({ submitHandler, initialState, modal }) {
  const [formstates, setFormstates, onChangeHandler, resetHandler] =
    useForm(initialState);

  //   console.log(formstates);

  const { title, description, startDate, endDate } = formstates;

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e, {
            [startDate]: [{ id: v4(), title, description, endDate }],
          });
          modal((prev) => {
            return !prev;
          });
        }}
      >
        <TextInputContainer>
          <TextInput
            name="title"
            state={title}
            onChangeHandler={onChangeHandler}
            label="Task Title"
            placeholder="Enter a task title"
            required={true}
            autoFocus={false}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInput
            required={true}
            name="description"
            state={description}
            onChangeHandler={onChangeHandler}
            label="Task Description"
            placeholder="Enter  Task description"
          />
        </TextInputContainer>

        <TextInputContainer>
          <DateInput
            required={true}
            name="startDate"
            state={startDate}
            onChangeHandler={onChangeHandler}
            label="Start Date"
            //   placeholder="69 street, J.F.K area"
          />
        </TextInputContainer>

        <TextInputContainer>
          <DateInput
            required={true}
            name="endDate"
            state={endDate}
            onChangeHandler={onChangeHandler}
            label="End Date"
            //   placeholder="Web developer"
          />
        </TextInputContainer>

        <ButtonContainer
          isResetDisable={
            Object.values(formstates).filter((value) => value.length !== 0)
              .length !== 0
          }
          disableSubmit={false}
        >
          <button type="submit">Create Task</button>
          <button
            disabled={
              Object.values(formstates).filter((value) => value.length !== 0)
                .length == 0
            }
            onClick={resetHandler}
          >
            Reset
          </button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}

export default Form;

import React from "react";
import useForm from "../Hooks/useForm.js";
import { v4 } from "uuid";
import { TextInput, DateInput } from "../Input/index.js";

import {
  OuterMost,
  FormContainer,
  TextInputContainer,
  ButtonContainer,
  CancelButton,
} from "./Form.styled.js";

function Form({ nest = false, submitHandler, initialState, modal }) {
  const [formstates, setFormstates, onChangeHandler, resetHandler] =
    useForm(initialState);

  //   console.log(formstates);

  const { registryTime, title, description, startDate, endDate } = formstates;

  console.log("ini", initialState);

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          if (!nest) {
            submitHandler(e, {
              [registryTime]: [
                { id: v4(), title, description, endDate, startDate },
              ],
            });
          } else {
            submitHandler(registryTime, {
              id: v4(),
              title,
              description,
              endDate,
              startDate,
            });
          }

          modal((prev) => {
            return !prev;
          });
        }}
      >
        <CancelButton
          onClick={() => {
            modal((prev) => {
              return !prev;
            });
          }}
        >
          Cancel
        </CancelButton>
        {!nest && (
          <TextInputContainer>
            <DateInput
              required={!nest}
              name="registryTime"
              state={registryTime}
              onChangeHandler={onChangeHandler}
              label="Registry Date"
              disabled={nest}
            />
          </TextInputContainer>
        )}
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
            type="textarea"
          />
        </TextInputContainer>

        <TextInputContainer>
          <DateInput
            required={true}
            name="startDate"
            state={startDate}
            onChangeHandler={onChangeHandler}
            label="Start Date"
            type="datetime-local"
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
            type="datetime-local"
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

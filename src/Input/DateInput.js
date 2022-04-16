import React, { useRef, useEffect } from "react";

function DateInput({
  required,
  state,
  name,
  onChangeHandler,
  placeholder,
  label,
}) {
  const inputRef = useRef(null);
  // useEffect(() => {
  //   !label && inputRef.current.focus();
  // }, []);
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        required={required}
        ref={inputRef}
        id={name}
        type="date"
        value={state}
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default DateInput;

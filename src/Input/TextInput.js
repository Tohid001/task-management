import React, { useRef, useEffect } from "react";

function TextInput({
  required,
  state,
  name,
  onChangeHandler,
  autoFocus = true,
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
        type="text"
        value={state}
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        autoFocus={autoFocus}
      />
    </>
  );
}

export default TextInput;

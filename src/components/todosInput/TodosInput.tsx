import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addTodo } from "../../slices/todosSlice";
import styles from "./TodosInput.module.scss";

const TodosInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if(inputValue.length) {
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
      <input
        className={styles.form__input}
        type="text"
        value={inputValue}
        placeholder={"Что вам нужно сделать?"}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={100}
      />
      <div
        className={styles.form__button}
        onClick={(e) => submitHandler(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      </div>
    </form>
  );
};

export default TodosInput;

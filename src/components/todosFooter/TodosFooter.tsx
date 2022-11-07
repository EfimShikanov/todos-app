import React from "react";
import styles from "./TodosFooter.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteDoneTodos } from "../../slices/todosSlice";

const TodosFooter: React.FC = () => {
  const todosList = useAppSelector((state) => state.todos.todosList);
  const dispatch = useAppDispatch();

  const getActiveTodosCount = () => {
    let count = 0;
    todosList.forEach((todo) => !todo.isDone && count++);
    return count;
  };

  return (
    <div className={styles.footer}>
      <div>{`Активно: ${getActiveTodosCount()}`}</div>
      <div
        className={styles.footer__button}
        onClick={() => dispatch(deleteDoneTodos())}
      >
        Удалить завершенные
      </div>
    </div>
  );
};

export default TodosFooter;

import React from "react";
import styles from "./TodosList.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFilter } from "../../slices/todosSlice";
import TodosListItem from "../todosListItem/TodosListItem";
import { Filter } from "../../app/types";

const TodosList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const filter: Filter = useAppSelector((state) => state.todos.filter);

  const filterClickHandler = (value: Filter) => {
    dispatch(setFilter(value));
  };

  const renderTodos = () => {
    switch (filter) {
      case "all": {
        return todos.map((todo) => {
          return <TodosListItem key={todo.id} todo={todo} />;
        });
      }
      case "active": {
        return todos.map((todo) => {
          if (!todo.isDone) {
            return <TodosListItem key={todo.id} todo={todo} />;
          }
        });
      }
      case "done": {
        return todos.map((todo) => {
          if (todo.isDone) {
            return <TodosListItem key={todo.id} todo={todo} />;
          }
        });
      }
    }
  };

  return (
    <div className={styles.todos}>
      <div className={styles.todos__filters}>
        <div
          className={styles.filters__item}
          style={filter === "all" ? { color: "#000000" } : {}}
          onClick={() => filterClickHandler("all")}
        >
          Все
        </div>
        <div
          className={styles.filters__item}
          style={filter === "active" ? { color: "#000000" } : {}}
          onClick={() => filterClickHandler("active")}
        >
          Активные
        </div>
        <div
          className={styles.filters__item}
          style={filter === "done" ? { color: "#000000" } : {}}
          onClick={() => filterClickHandler("done")}
        >
          Завершенные
        </div>
      </div>
      <div className={styles.todos__list}>{renderTodos()}</div>
    </div>
  );
};

export default TodosList;

import React, { useState } from "react";
import styles from "./TodosListItem.module.scss";
import { Todo } from "../../app/types";
import { deleteTodo, setIsDone } from "../../slices/todosSlice";
import { useAppDispatch } from "../../app/hooks";
import { setIsEditing, updateTodoValue } from "../../slices/todosSlice";

interface TodosListItemProps {
  todo: Todo;
}

const TodosListItem: React.FC<TodosListItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [newTodoValue, setNewTodoValue] = useState(todo.value);

  return (
    <div className={styles.todo}>
      <div className={styles.todo__group}>
        <input
          className={styles.todo__checkbox}
          type="checkbox"
          onChange={() => dispatch(setIsDone(todo.id))}
          checked={todo.isDone}
        />
        {todo.isEditing ? (
          <input
            className={styles.todo__input}
            type="text"
            value={newTodoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
          />
        ) : (
          <div
            style={
              todo.isDone
                ? { color: "rgba(0,0,0,0.4)", textDecoration: "line-through" }
                : {}
            }
            className={styles.todo__text}
          >
            {todo.value}
          </div>
        )}
      </div>
      {todo.isEditing ? (
        <div className={styles.todo__buttonsGroup}>
          <div
            className={styles.todo__button}
            onClick={() =>
              dispatch(updateTodoValue({ id: todo.id, value: newTodoValue }))
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#94bbe9"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
            </svg>
          </div>
          <div
            className={styles.todo__button}
            onClick={() => dispatch(setIsEditing(todo.id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#eeaeca"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className={styles.todo__buttonsGroup}>
          <div
            className={styles.todo__button}
            onClick={() => dispatch(setIsEditing(todo.id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#94bbe9"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </div>
          <div
            className={styles.todo__button}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#eeaeca"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosListItem;

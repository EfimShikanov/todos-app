import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState, UpdatedTodo, Todo } from "../app/types";

let todosList: Todo[];

if (localStorage.todosStorage) {
  todosList = JSON.parse(localStorage.todosStorage);
} else {
  localStorage.setItem(
    "todosStorage",
    JSON.stringify([
      { id: 0, value: "Найти вакансию", isDone: true, isEditing: false },
      { id: 1, value: "Создать приложение", isDone: false, isEditing: false },
      {
        id: 2,
        value: "Попасть на стажировку",
        isDone: false,
        isEditing: false,
      },
    ])
  );
  todosList = JSON.parse(localStorage.todosStorage);
}

const initialState: ApplicationState = {
  todosList,
  filter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todosList.push({
        id: state.todosList.length
          ? Math.max(...state.todosList.map((todo) => todo.id)) + 1
          : 0,
        value: action.payload,
        isEditing: false,
        isDone: false,
      });
      localStorage.todosStorage = JSON.stringify(state.todosList);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todosList.find((item) => item.id === action.payload);
      if (todo) {
        const todoIndex = state.todosList.indexOf(todo);
        state.todosList.splice(todoIndex, 1);
      }
      localStorage.todosStorage = JSON.stringify(state.todosList);
    },
    deleteDoneTodos: (state) => {
      state.todosList
        .filter((todo) => todo.isDone)
        .forEach((todo) => {
          const todoIndex = state.todosList.indexOf(todo);
          state.todosList.splice(todoIndex, 1);
        });
      localStorage.todosStorage = JSON.stringify(state.todosList);
    },
    updateTodoValue: (state, action: PayloadAction<UpdatedTodo>) => {
      const todo = state.todosList.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.value = action.payload.value;
        todo.isEditing = false;
      }
      localStorage.todosStorage = JSON.stringify(state.todosList);
    },
    setIsDone: (state, action: PayloadAction<number>) => {
      const todo = state.todosList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
      localStorage.todosStorage = JSON.stringify(state.todosList);
    },
    setIsEditing: (state, action: PayloadAction<number>) => {
      state.todosList.forEach((todo) => {
        todo.id !== action.payload &&
          (todo.isEditing = todo.id === action.payload);
        todo.id === action.payload && (todo.isEditing = !todo.isEditing);
      });
    },
    setFilter: (state, action: PayloadAction<"all" | "active" | "done">) => {
      state.filter = action.payload;
      state.todosList.forEach((todo) => (todo.isEditing = false));
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  deleteDoneTodos,
  updateTodoValue,
  setIsDone,
  setIsEditing,
  setFilter,
} = todosSlice.actions;

export default todosSlice.reducer;

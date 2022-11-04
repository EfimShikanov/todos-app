import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState, UpdatedTodo, Todo } from "../app/types";

let todos: Todo[];

if (localStorage.todosStorage) {
  todos = JSON.parse(localStorage.todosStorage);
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
  todos = JSON.parse(localStorage.todosStorage);
}

const initialState: ApplicationState = {
  todos,
  filter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Math.max(...state.todos.map(todo => todo.id)) + 1,
        value: action.payload,
        isEditing: false,
        isDone: false,
      });
      localStorage.todosStorage = JSON.stringify(state.todos);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) {
        const todoIndex = state.todos.indexOf(todo);
        state.todos.splice(todoIndex, 1);
      }
      localStorage.todosStorage = JSON.stringify(state.todos);
    },
    deleteDoneTodos: (state) => {
      state.todos.forEach((todo) => {
        if (todo.isDone) {
          const todoIndex = state.todos.indexOf(todo);
          state.todos.splice(todoIndex, 1);
        }
      });
      localStorage.todosStorage = JSON.stringify(state.todos);
    },
    updateTodoValue: (state, action: PayloadAction<UpdatedTodo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.value = action.payload.value;
        todo.isEditing = false;
      }
      localStorage.todosStorage = JSON.stringify(state.todos);
    },
    setIsDone: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
      localStorage.todosStorage = JSON.stringify(state.todos);
    },
    setIsEditing: (state, action: PayloadAction<number>) => {
      state.todos.forEach((todo) => {
        todo.id !== action.payload &&
          (todo.isEditing = todo.id === action.payload);
        todo.id === action.payload && (todo.isEditing = !todo.isEditing);
      });
    },
    setFilter: (state, action: PayloadAction<"all" | "active" | "done">) => {
      state.filter = action.payload;
      state.todos.forEach((todo) => (todo.isEditing = false));
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

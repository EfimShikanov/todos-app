import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState, UpdatedTodo } from "../app/types";

const initialState: ApplicationState = {
  todos: [
    { id: 0, value: "Найти вакансию", isDone: true, isEditing: false },
    { id: 1, value: "Создать приложение", isDone: false, isEditing: false },
    { id: 2, value: "Попасть на стажировку", isDone: false, isEditing: false },
  ],
  filter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: state.todos.length,
        value: action.payload,
        isEditing: false,
        isDone: false,
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) {
        const todoIndex = state.todos.indexOf(todo);
        state.todos.splice(todoIndex, 1);
      }
    },
    updateTodoValue: (state, action: PayloadAction<UpdatedTodo>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.value = action.payload.value;
        todo.isEditing = false;
      }
    },
    setIsDone: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    setIsEditing: (state, action: PayloadAction<number>) => {
      state.todos.map((todo) => {
        todo.isEditing = todo.id === action.payload;
      });
    },
    setFilter: (state, action: PayloadAction<"all" | "active" | "done">) => {
      state.filter = action.payload;
      state.todos.map((todo) => {
        todo.isEditing = false;
      });
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodoValue,
  setIsDone,
  setIsEditing,
  setFilter,
} = todosSlice.actions;

export default todosSlice.reducer;

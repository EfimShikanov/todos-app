import { store } from "../../app/store";
import {
  addTodo,
  deleteTodo,
  deleteDoneTodos,
  updateTodoValue,
  setIsDone,
  setIsEditing,
  setFilter,
} from "../../slices/todosSlice";

test("should create new todo", () => {
  let todosList = store.getState().todos.todosList;
  const initialTodosListLength = todosList.length;
  const newTodoText = "new todo";
  store.dispatch(addTodo(newTodoText));
  todosList = store.getState().todos.todosList;

  const newTodo = todosList.find((todo) => todo.value === newTodoText);
  expect(todosList.length).toBeGreaterThan(initialTodosListLength);
  expect(newTodo?.value).toBe("new todo");
  expect(newTodo?.isDone).toBe(false);
  expect(newTodo?.isEditing).toBe(false);
});

test("should delete todo", () => {
  let todosList = store.getState().todos.todosList;
  const initialTodosListLength = todosList.length;
  store.dispatch(deleteTodo(0));

  expect(todosList.length).toEqual(initialTodosListLength);
});

test("should set todo is done", () => {
  store.dispatch(setIsDone(1));
  let todosList = store.getState().todos.todosList;
  let todoDone = todosList.find((todo) => todo.id === 1);

  expect(todoDone?.isDone).toBe(true);
});

test("should set todo is editing", () => {
  store.dispatch(setIsEditing(1));
  let todosList = store.getState().todos.todosList;
  let todoEditing = todosList.find((todo) => todo.id === 1);

  expect(todoEditing?.isEditing).toBe(true);
});

test("should delete done todos", () => {
  let todosList = store.getState().todos.todosList;
  const initialTodosListLength = todosList.length;
  store.dispatch(deleteDoneTodos());
  todosList = store.getState().todos.todosList;

  expect(todosList.length).toBeLessThan(initialTodosListLength);
});

test("should update todo value", () => {
  store.dispatch(addTodo("todo to change"));
  let todosList = store.getState().todos.todosList;
  let newTodo = todosList.find((todo) => todo.value === "todo to change");
  if (newTodo) {
    store.dispatch(updateTodoValue({ id: newTodo.id, value: "updated value" }));
  }
  todosList = store.getState().todos.todosList;
  newTodo = todosList.find((todo) => todo.id === newTodo?.id);

  expect(newTodo?.value).toBe("updated value");
});

test("should set filter", () => {
  store.dispatch(setFilter("active"));
  let filter = store.getState().todos.filter;

  expect(filter).toBe("active");
});

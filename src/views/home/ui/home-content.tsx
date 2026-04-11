'use client';

import { CreateTodo } from '@features/create-todo';
import { DeleteTodo } from '@features/delete-todo';
import { Filter } from '@features/filter';
import { UpdateTodo } from '@features/update-todo';
import { TodoList } from '@widgets/todo-list';

export function HomeContent() {
  return (
    <>
      <Filter />
      <TodoList />
      <CreateTodo />
      <UpdateTodo />
      <DeleteTodo />
    </>
  );
}

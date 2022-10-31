import React from 'react';
import styles from './App.module.scss';
import TodosInput from "./components/todosInput/TodosInput";
import TodosList from "./components/todosList/TodosList";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>todos</div>
      <TodosInput />
      <TodosList />
    </div>
  );
}

export default App;

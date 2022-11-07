import React from 'react';
import styles from './App.module.scss';
import TodosInput from "./components/todosInput/TodosInput";
import TodosList from "./components/todosList/TodosList";
import TodosFooter from "./components/todosFooter/TodosFooter";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>todos</div>
      <TodosInput />
      <TodosList />
      <TodosFooter />
    </div>
  );
}

export default App;

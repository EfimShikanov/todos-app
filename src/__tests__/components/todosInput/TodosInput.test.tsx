import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import TodosFooter from "../../../components/todosFooter/TodosFooter";
import TodosInput from "../../../components/todosInput/TodosInput";

test("renders input component", () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <TodosInput />
    </Provider>
  );

  expect(getByPlaceholderText(/Что вам нужно сделать?/)).toBeInTheDocument();
})

test("creates new todo", () => {

})


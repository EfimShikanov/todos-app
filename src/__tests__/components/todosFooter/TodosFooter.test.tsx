import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import TodosFooter from "../../../components/todosFooter/TodosFooter";

test("renders component", () => {
  const { getByText } = render(
    <Provider store={store}>
      <TodosFooter />
    </Provider>
  );

  expect(getByText(/Активно/)).toBeInTheDocument();
  expect(getByText(/Удалить/)).toBeInTheDocument();
});

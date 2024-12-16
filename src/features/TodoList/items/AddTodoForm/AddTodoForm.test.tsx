import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/tests/componentRender';
import { mockTodos } from 'shared/tests/mocks';

import { AddTodoForm } from './AddTodoForm';
import { todosActions } from '../../model/slice/TodosSlice';

jest.mock('../../model/slice/TodosSlice', () => ({
  ...jest.requireActual('../../model/slice/TodosSlice'),
  todosActions: {
    addTodo: jest.fn((value: string) => {
      return ({ type: 'addTodo', payload: value })
    }),
  },
}));


describe('AddTodoForm', () => {
  test('should call addTodo action when form is submitted', async () => {
    const user = userEvent.setup()

    componentRender(<AddTodoForm />, {
      initialState: { todos: mockTodos }
    })

    const inputElement = screen.getByTestId('input');
    const inputValue = 'New Todo';

    await user.type(inputElement, inputValue);

    await user.keyboard('{Enter}');

    expect(todosActions.addTodo).toHaveBeenCalledWith(inputValue);
  });

  test('should call addTodo action when input is empty', async () => {
    const user = userEvent.setup()
    componentRender(<AddTodoForm />, {
      initialState: { todos: mockTodos }
    })

    await user.keyboard('{Enter}');

    expect(todosActions.addTodo).not.toHaveBeenCalled();
  });
});

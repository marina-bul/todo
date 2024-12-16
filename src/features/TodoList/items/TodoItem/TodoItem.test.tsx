import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from 'shared/tests/componentRender';
import { mockTodos } from 'shared/tests/mocks';

import { TodoItem } from './TodoItem';
import { todosActions } from '../../model/slice/TodosSlice';

jest.mock('../../model/slice/TodosSlice', () => ({
  ...jest.requireActual('../../model/slice/TodosSlice'),
  todosActions: {
    completeTodo: jest.fn((value: number) => {
      return ({ type: 'completeTodo', payload: value })
    }),
    unCompleteTodo: jest.fn((value: number) => {
      return ({ type: 'unCompleteTodo', payload: value })
    }),
  },
}));


describe('TodoItem', () => {
  test('should render TodoItem with wright content', () => {
    componentRender(<TodoItem todo={mockTodos[0]} />, {
      initialState: { todos: mockTodos }
    })

    expect(screen.getByTestId('todoItem')).toHaveTextContent('Learn Jest');
    expect(screen.getByTestId('checkbox1')).not.toBeChecked();
  });

  test('should completeTodo when checkbox is checked', async () => {
    const user = userEvent.setup()
    componentRender(<TodoItem todo={mockTodos[0]} />, {
      initialState: { todos: mockTodos }
    })

    const checkbox = screen.getByTestId('checkbox1');
    await user.click(checkbox)

    expect(todosActions.completeTodo).toHaveBeenCalledWith(mockTodos[0].id);
    expect(todosActions.unCompleteTodo).not.toHaveBeenCalled();
  });
});

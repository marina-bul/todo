import { mockTodos } from 'shared/tests/mocks'

import { todosActions, todosReducer } from './TodosSlice'

import type { Todo } from 'shared/types/StateSchema'


describe('TodosSlice', () => {
  test('completeTodo action', () => {
    const state = { todos: mockTodos }
    const result = [
      { id: 1, text: 'Learn Jest', isCompleted: true },
      { id: 2, text: 'Write tests', isCompleted: true },
    ]

    expect(todosReducer(state, todosActions.completeTodo(1))).toEqual({ todos: result })
  })

  test('uncompleteTodo action', () => {
    const state = { todos: mockTodos }
    const result = [
      { id: 1, text: 'Learn Jest', isCompleted: false },
      { id: 2, text: 'Write tests', isCompleted: false },
    ]

    expect(todosReducer(state, todosActions.unCompleteTodo(2))).toEqual({ todos: result })
  })

  test('should remove all completed todos', () => {
    const state = { todos: mockTodos }
    const result = [
      { id: 1, text: 'Learn Jest', isCompleted: false },
    ]

    expect(todosReducer(state, todosActions.clearCompleted())).toEqual({ todos: result })
  })

  test('should add new todo', () => {
    const state = { todos: mockTodos }
    const result = [
      { id: 1, text: 'Learn Jest', isCompleted: false },
      { id: 2, text: 'Write tests', isCompleted: true },
      { id: 3, text: 'New Todo', isCompleted: false },
    ]

    expect(todosReducer(state, todosActions.addTodo('New Todo'))).toEqual({ todos: result })
  })

  test('should add new todo to empty array', () => {
    const emptyTodos: Todo[] = []
    const state = { todos: emptyTodos }
    const result = [
      { id: 1, text: 'New Todo', isCompleted: false },
    ]

    expect(todosReducer(state, todosActions.addTodo('New Todo'))).toEqual({ todos: result })
  })
})
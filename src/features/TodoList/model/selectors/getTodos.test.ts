import { mockTodos } from 'shared/tests/mocks'

import { getTodos } from './getTodos'

describe('getTodos', () => {
  test('should return todos from state', () => {
    const state = { todos: mockTodos }

    expect(getTodos(state)).toEqual(mockTodos)
  })
})
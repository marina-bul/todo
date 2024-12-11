import { createSlice } from '@reduxjs/toolkit';

import type { StateSchema, Todo } from 'shared/types/StateSchema';

const initialState: StateSchema = {
  todos: []
}

const todosSlice = createSlice({
  name: 'Todos',
  initialState,
  reducers: {
    completeTodo: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find((item) => item.id === todoId);
      if (todo) {
        todo.isCompleted = true;
      }
    },
    unCompleteTodo: (state, action) => {
      const todoId = action.payload;
      const todo = state.todos.find((item) => item.id === todoId);
      if (todo) {
        todo.isCompleted = false;
      }
    },
    addTodo: (state, action) => {
      const todoText = action.payload;
      const newTodo: Todo = {
        id: state.todos[state.todos.length - 1].id + 1,
        text: todoText,
        isCompleted: false
      }
      state.todos.push(newTodo)
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.isCompleted)
    }
  }
})

export const { actions: todosActions } = todosSlice
export const { reducer: todosReducer } = todosSlice
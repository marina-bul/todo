import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from 'features/TodoList/model/slice/TodosSlice';

import type { StateSchema } from 'shared/types/StateSchema';

export function createReduxStore(initialState: StateSchema) {
  return configureStore<StateSchema>({
    reducer: todosReducer,
    preloadedState: initialState
  })
} 
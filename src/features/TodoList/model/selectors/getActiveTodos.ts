import type { StateSchema } from 'shared/types/StateSchema';

export const getActiveTodos = (state: StateSchema) => state.todos.filter(todo => !todo.isCompleted)
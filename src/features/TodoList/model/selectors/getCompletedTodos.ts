import type { StateSchema } from 'shared/types/StateSchema';

export const getCompletedTodos = (state: StateSchema) => state.todos.filter(todo => todo.isCompleted)
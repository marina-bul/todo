import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';

import { getTodos } from './model/selectors/getTodos';
import { todosActions } from './model/slice/TodosSlice';
import { AddTodoForm } from './items/AddTodoForm/AddTodoForm';
import { TodoItem } from './items/TodoItem/TodoItem';
import styles from './TodoList.module.scss';

import type { MouseEvent } from 'react'


type FilterValue = 'ALL' | 'ACTIVE' | 'COMPLETED'

interface Filter {
  label: string
  value: FilterValue
}

const filters: Filter[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Completed', value: 'COMPLETED' },
];

export const TodoList = () => {
  const [ currentFilter, setCurrentFilter ] = useState<FilterValue>(filters[0].value);
  const dispatch = useDispatch()
  const allTodos = useSelector(getTodos)

  const activeTodos = useMemo(() => {
    return allTodos.filter(todo => !todo.isCompleted)
  }, [allTodos])

  const todos = useMemo(() => {
    switch (currentFilter) {
    case 'ACTIVE':
      return activeTodos
    case 'COMPLETED':
      return allTodos.filter(todo => todo.isCompleted)
    default:
      return allTodos
    }
  }, [currentFilter, activeTodos, allTodos])

  const handleSwitchFilter = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const filter = e.currentTarget.dataset.filter;
    setCurrentFilter(filter as FilterValue)
  }, [])


  return (
    <div className={styles.container}>
      <AddTodoForm />
      <ul className={styles.list}>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className={styles.footer}>
        <span>{activeTodos.length} items left</span>
        <div className={styles.filters}>
          {filters.map(filter => (
            <button 
              key={filter.value}
              className={cn(styles.btn, { [styles.active]: filter.value === currentFilter })} 
              data-filter={filter.value}
              onClick={handleSwitchFilter}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <button 
          className={styles.btn} 
          onClick={() => dispatch(todosActions.clearCompleted())}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

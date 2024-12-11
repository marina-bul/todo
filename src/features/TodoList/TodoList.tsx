import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'clsx';

import { getTodos } from './model/selectors/getTodos';
import { getActiveTodos } from './model/selectors/getActiveTodos';
import { getCompletedTodos } from './model/selectors/getCompletedTodos';
import { todosActions } from './model/slice/TodosSlice';
import styles from './TodoList.module.scss';

import type { ChangeEvent, FormEvent } from 'react';
import type { Todo } from 'shared/types/StateSchema';

export const TodoList = () => {
  const [ filter, setFilter ] = useState('all');
  const [ input, setInput ] = useState('')
  const dispatch = useDispatch()
  const allTodos = useSelector(getTodos)
  const activeTodos = useSelector(getActiveTodos)
  const completedTodos = useSelector(getCompletedTodos)
  const todos = useMemo(() => {
    switch (filter) {
    case 'active':
      return activeTodos
    case 'completed':
      return completedTodos
    default:
      return allTodos
    }
  }, [filter, activeTodos, completedTodos, allTodos])
  

  const switchIsCompleted = useCallback((task: Todo) => { 
    if(task.isCompleted) {
      dispatch(todosActions.unCompleteTodo(task.id))
    } else {
      dispatch(todosActions.completeTodo(task.id))
    }
  }, [dispatch])

  const addTodo = useCallback((e: FormEvent) => { 
    e.preventDefault()
    dispatch(todosActions.addTodo(input))
    setInput('')
  }, [input, dispatch])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => { 
    setInput(e.target.value)
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={addTodo}>
        <input 
          className={styles.input} 
          value={input} 
          type="text" 
          placeholder='What needs to be done?'
          onChange={handleInputChange}
        />
      </form>
      <ul className={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} className={styles.todo}>
            <label  
              htmlFor={`checkbox${todo.id}`} 
              className={cn(styles.checkboxLabel, { [styles.checked]: todo.isCompleted })}
            >
              <input type="checkbox" id={`checkbox${todo.id}`} className={styles.checkbox} checked={todo.isCompleted} onChange={() => switchIsCompleted(todo)} />
              <span className={styles.checkboxView}>
                <svg className={styles.checkboxIcon} xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 511.985 511.985">
                  <path fill="#fff" d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"/>
                </svg>
              </span>
              {todo.text}
            </label>
          </li>
        ))}
        
      </ul>
      <div className={styles.footer}>
        <span>{activeTodos.length} items left</span>
        <div className={styles.filters}>
          <button className={styles.btn} onClick={() => setFilter('all')}>All</button>
          <button className={styles.btn} onClick={() => setFilter('active')}>Active</button>
          <button className={styles.btn} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className={styles.btn} onClick={() => dispatch(todosActions.clearCompleted())}>Clear completed</button>
      </div>
    </div>
  );
};

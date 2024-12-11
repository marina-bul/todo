import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import cn from 'clsx';

import { getTodos } from './model/selectors/getTodos';
import { getActiveTodos } from './model/selectors/getActiveTodos';
import { getCompletedTodos } from './model/selectors/getCompletedTodos';
import { todosActions } from './model/slice/TodosSlice';
import { AddTodoForm } from './items/AddTodoForm/AddTodoForm';
import styles from './TodoList.module.scss';
import { TodoItem } from './items/TodoItem/TodoItem';


enum Filters {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const TodoList = () => {
  const [ filter, setFilter ] = useState(Filters.ALL);
  const dispatch = useDispatch()
  const allTodos = useSelector(getTodos)
  const activeTodos = useSelector(getActiveTodos)
  const completedTodos = useSelector(getCompletedTodos)

  const todos = useMemo(() => {
    switch (filter) {
    case Filters.ACTIVE:
      return activeTodos
    case Filters.COMPLETED:
      return completedTodos
    default:
      return allTodos
    }
  }, [filter, activeTodos, completedTodos, allTodos])


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
          <button className={styles.btn} onClick={() => setFilter(Filters.ALL)}>{Filters.ALL}</button>
          <button className={styles.btn} onClick={() => setFilter(Filters.ACTIVE)}>{Filters.ACTIVE}</button>
          <button className={styles.btn} onClick={() => setFilter(Filters.COMPLETED)}>{Filters.COMPLETED}</button>
        </div>
        <button className={styles.btn} onClick={() => dispatch(todosActions.clearCompleted())}>Clear completed</button>
      </div>
    </div>
  );
};

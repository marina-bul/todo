import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';
import { InputCheckbox } from 'shared/ui/InputCheckbox/InputCheckbox';

import { todosActions } from '../../model/slice/TodosSlice';
import styles from './TodoItem.module.scss';

import type { FC } from 'react';
import type { Todo } from 'shared/types/StateSchema';


interface TodoItemProps {
  className?: string;
  todo: Todo
}

export const TodoItem:FC<TodoItemProps> = ({ className, todo }) => {
  const dispatch = useDispatch()

  const switchIsCompleted = useCallback(() => { 
    if(todo.isCompleted) {
      dispatch(todosActions.unCompleteTodo(todo.id))
    } else {
      dispatch(todosActions.completeTodo(todo.id))
    }
  }, [todo, dispatch])

  return (
    <li className={cn([styles.todoItem, className])} data-testid='todoItem'>
      <InputCheckbox 
        checkboxId={`checkbox${todo.id}`} 
        label={todo.text} 
        isChecked={todo.isCompleted}
        onCheckboxChange={switchIsCompleted} 
      />
    </li>
  );
};
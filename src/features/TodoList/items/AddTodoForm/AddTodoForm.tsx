import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/Input/Input';

import { todosActions } from '../../model/slice/TodosSlice';

import type { FormEvent } from 'react';


export const AddTodoForm = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = useCallback((e: FormEvent) => { 
    e.preventDefault()
    const value = inputRef.current?.value || ''
    
    if(inputRef.current && inputRef.current.value.length > 0) {
      dispatch(todosActions.addTodo(value))
      inputRef.current.value = ''
    }
    
  }, [dispatch])

  return (
    <form data-testid='form' onSubmit={handleAddTodo}>
      <Input ref={inputRef} />
    </form>
  );
};
import { forwardRef } from 'react';
import cn from 'clsx';

import styles from './Input.module.scss';

import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...restProps }, ref) => {

  return (
    <input 
      ref={ref}
      className={cn(styles.input, className)}
      type="text" 
      placeholder='What needs to be done?'
      {...restProps}
    />
  );
});

Input.displayName = 'Input';
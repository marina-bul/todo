
import { TodoList } from 'features/TodoList/TodoList';

import styles from './MainPage.module.scss';


export const MainPage = () => {

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>todos</h1>
      <TodoList />
    </div>
  );
};

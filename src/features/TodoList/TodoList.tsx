
import styles from './TodoList.module.scss';


export const TodoList = () => {

  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder='What needs to be done?'/>
      <ul className={styles.list}>
        <li className={styles.todo}>item 1</li>
      </ul>
      <div className={styles.footer}>
        <span>n items left</span>
        <div className={styles.filters}>
          <button className={styles.btn}>All</button>
          <button className={styles.btn}>Active</button>
          <button className={styles.btn}>Completed</button>
        </div>
        <button className={styles.btn}>Clear completed</button>
      </div>
    </div>
  );
};

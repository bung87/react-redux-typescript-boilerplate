import React from 'react';
import style from './style.module.css';
import { TodoActions } from '@actions';
import { TodoItem } from '../TodoItem';
import { TodoModel } from '@models/TodoModel';

interface Props {
  todos: TodoModel[];
  actions: typeof TodoActions;
}
export const TodoList = ({ todos, actions }: Props): JSX.Element => {
  const hasIncompleted = React.useMemo(() => todos.some(todo => !todo.completed), [todos]);
  return (
    <section className={style.main}>
      {hasIncompleted && (
        <input className={style.toggleAll} type="checkbox" checked={hasIncompleted} onChange={actions.completeAll} />
      )}

      <ul className={style.normal}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={actions.completeTodo}
            deleteTodo={actions.deleteTodo}
            editTodo={actions.editTodo}
          />
        ))}
      </ul>
    </section>
  );
};

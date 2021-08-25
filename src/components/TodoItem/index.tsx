import React, { useState } from 'react';
import classNames from 'classnames';
import style from './style.module.css';
import { TodoModel } from '@models';
import { TodoActions } from '@actions';
import { TodoTextInput } from '../TodoTextInput';

interface Props {
  todo: TodoModel;
  editTodo: typeof TodoActions.editTodo;
  deleteTodo: typeof TodoActions.deleteTodo;
  completeTodo: typeof TodoActions.completeTodo;
}

export const TodoItem = ({
  todo, editTodo, deleteTodo, completeTodo,
}: Props) => {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = React.useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const handleSave = React.useCallback(
    (id: number, text: string) => {
      if (text.length === 0) {
        deleteTodo(id);
      } else {
        editTodo({ id, text });
      }
      setEditing(false);
    },
    [editTodo, deleteTodo, setEditing],
  );

  const classes = classNames({
    [style.completed]: todo.completed,
    [style.editing]: editing,
    [style.normal]: !editing,
  });

  return (
    <li className={classes}>
      {editing ? (
        <TodoTextInput onSave={text => todo.id && handleSave(todo.id, text)} />
      ) : (
        <div className={style.view}>
          <input
            type="checkbox"
            className={style.toggle}
            checked={todo.completed}
            onChange={() => todo.id && completeTodo(todo.id)}
          />
          <label onDoubleClick={() => handleDoubleClick()}>{todo.text}</label>
          <button
            type="button"
            className={style.destroy}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id);
            }}
          />
        </div>
      )}
    </li>
  );
};

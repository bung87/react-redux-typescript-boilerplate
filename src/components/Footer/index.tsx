import React from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import * as TodoModel from '@models';

export const FILTER_TITLES = {
  [TodoModel.Filter.SHOW_ALL]: 'All',
  [TodoModel.Filter.SHOW_ACTIVE]: 'Active',
  [TodoModel.Filter.SHOW_COMPLETED]: 'Completed',
};

export interface Props {
  filter: TodoModel.Filter;
  activeCount?: number;
  completedCount?: number;
  onClickFilter: (filter: TodoModel.Filter) => any;
  onClickClearCompleted: () => any;
}
export const Footer = ({
  filter,
  activeCount,
  completedCount,
  onClickFilter,
  onClickClearCompleted,
}: Props): JSX.Element => {
  const renderTodoCount = React.useCallback((): JSX.Element => {
    const itemWord = activeCount === 1 ? ' item' : 'items';
    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong>
        {' '}
        {itemWord}
        {' '}
        left
      </span>
    );
  }, [activeCount]);

  const renderFilterLink = React.useCallback(
    (selectedFilter: TodoModel.Filter): JSX.Element => {
      return (
        <a
          className={classNames({ [style.selected]: filter === selectedFilter })}
          style={{ cursor: 'pointer' }}
          onClick={() => onClickFilter(selectedFilter)}
        >
          {FILTER_TITLES[selectedFilter]}
        </a>
      );
    },
    [filter, onClickFilter],
  );

  const renderClearButton = React.useCallback((): JSX.Element | void => {
    if (completedCount! > 0) {
      return <button type="button" className={style.clearCompleted} onClick={onClickClearCompleted}>Clear completed</button>;
    }
    return null;
  }, [completedCount]);

  return (
    <footer className={style.normal}>
      {renderTodoCount()}
      <ul className={style.filters}>
        {(Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(key => (
          <li key={key}>
            {renderFilterLink(TodoModel.Filter[key])}
            {' '}
          </li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};

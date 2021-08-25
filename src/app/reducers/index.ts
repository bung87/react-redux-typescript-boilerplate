import { combineReducers } from 'redux';
import type { RootState } from './state';
import { todoReducer } from './todos';

export const rootReducer = combineReducers<RootState>({
  todos: todoReducer,
});

export { RootState };

import { handleActions } from 'redux-actions';
import { TodoState } from './state';
import { Type } from '@actions/todos';
import { TodoModel } from '@models';

const initialState: TodoState = [
  {
    id: 1,
    text: 'Use Redux',
    completed: false,
  },
];

export const todoReducer = handleActions<TodoState, TodoModel>(
  {
    [Type.ADD_TODO]: (state, action) => {
      if (action.payload?.text) {
        return [
          {
            id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text,
          },
          ...state,
        ];
      }
      return state;
    },
    [Type.DELETE_TODO]: (state, action) => {
      return state.filter(todo => todo.id !== (action.payload as any));
    },
    [Type.EDIT_TODO]: (state, action) => {
      return state.map(todo => {
        if (!todo || !action || !action.payload) {
          return todo;
        }
        return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text } : todo;
      });
    },
    [Type.COMPLETE_TODO]: (state, action) => {
      return state.map(todo => (todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo));
    },
    [Type.COMPLETE_ALL]: (state, action) => {
      return state.map(todo => ({ ...todo, completed: true }));
    },
    [Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter(todo => todo.completed === false);
    },
  },
  initialState,
);

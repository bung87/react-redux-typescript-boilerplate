import { TodoModel } from 'app/models';

export type TodoState = TodoModel[];
export interface RootState {
  todos: TodoState;
  router?: any;
}

import { TodoModel } from '@models';

export type TodoState = TodoModel[];
export interface RootState {
  todos: TodoState;
  router?: any;
}

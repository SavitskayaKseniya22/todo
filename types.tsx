export enum TaskStatusType {
  'ACTIVE' = 'active',
  'COMPLETED' = 'completed',
}

export type TaskType = {
  content: string;
  id: string;
  status: TaskStatusType;
};

export type TaskListType = TaskType[];

export enum SortType {
  'ALL' = 'all',
  'COMPLETED' = 'completed',
  'ACTIVE' = 'active',
}

export type ReducerActionType =
  | {
      type:
        | ActionType.COMPLETE_ALL
        | ActionType.CLEAR_ALL
        | ActionType.CLEAR_COMPLETED;
    }
  | {
      type:
        | ActionType.COMPLETE_TASK
        | ActionType.REMOVE_TASK
        | ActionType.UNCOMPLETE_TASK;
      payload: { id: string };
    }
  | {
      type: ActionType.ADD_TASK;
      payload: { content: string };
    }
  | {
      type: ActionType.CHANGE_SORT;
      payload: { sort: SortType };
    };

export type ReducerStateType = { tasks: TaskListType; sort: SortType };

export enum ActionType {
  'COMPLETE_ALL' = 'complete-all',
  'CLEAR_ALL' = 'clear-all',
  'CLEAR_COMPLETED' = 'clear-completed',
  'COMPLETE_TASK' = 'complete-task',
  'REMOVE_TASK' = 'remove-task',
  'UNCOMPLETE_TASK' = 'uncomplete-task',
  'ADD_TASK' = 'add-task',
  'CHANGE_SORT' = 'change-sort',
}

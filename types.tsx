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

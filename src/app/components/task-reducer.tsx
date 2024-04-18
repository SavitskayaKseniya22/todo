import {
  ActionType,
  ReducerActionType,
  ReducerStateType,
  TaskListType,
  TaskStatusType,
} from '../../../types';
import makeid from '../../../utils';

export default function reducer(
  state: ReducerStateType,
  action: ReducerActionType
) {
  switch (action.type) {
    case ActionType.CHANGE_SORT:
      return {
        ...state,
        sort: action.payload.sort,
      };

    case ActionType.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload.id),
      };
    case ActionType.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: TaskStatusType.COMPLETED }
            : item;
        }),
      };
    case ActionType.UNCOMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: TaskStatusType.ACTIVE }
            : item;
        }),
      };

    case ActionType.CLEAR_ALL:
      return { ...state, tasks: [] };
    case ActionType.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter(
          (item) => item.status !== TaskStatusType.COMPLETED
        ),
      };
    case ActionType.COMPLETE_ALL:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return { ...item, status: TaskStatusType.COMPLETED };
        }),
      };
    case ActionType.ADD_TASK:
      const newTask = {
        content: action.payload.content,
        id: makeid(),
        status: TaskStatusType.ACTIVE,
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    default:
      return state;
  }
}

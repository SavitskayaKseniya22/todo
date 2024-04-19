import {
  TrashIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';

import { TaskStatusType, TaskType } from '../../../../types';

export default function Task({
  data,
  onChangeTask,
  onDeleteTask,
}: {
  data: TaskType;
  onChangeTask: ({
    id,
    status,
  }: {
    id: string;
    status: TaskStatusType;
  }) => void;
  onDeleteTask: ({ id }: { id: string }) => void;
}) {
  const { content, status, id } = data;

  return (
    <li
      data-testid="task"
      data-status={status}
      className={`flex gap-2 bg-slate-200 p-1 sm:p-2 rounded-2xl odd:bg-slate-300 ${
        status === TaskStatusType.COMPLETED ? 'opacity-25' : ''
      }`}
    >
      <div className="p-2 rounded-xl flex-grow ">{content}</div>

      <button
        data-testid="task-button-change"
        type="button"
        className="bg-lime-700 rounded-xl sm:p-2 p-1"
        onClick={() => {
          onChangeTask({ id, status });
        }}
      >
        {status === TaskStatusType.COMPLETED ? (
          <MinusCircleIcon className="w-6 h-6 text-white" />
        ) : (
          <CheckCircleIcon className="w-6 h-6 text-white" />
        )}
      </button>
      <button
        data-testid="task-button-remove"
        type="button"
        className="bg-lime-700 rounded-xl sm:p-2 p-1"
        onClick={() => {
          onDeleteTask({ id });
        }}
      >
        <TrashIcon className="w-6 h-6 text-white" />
      </button>
    </li>
  );
}

import {
  TrashIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';

import { TaskStatusType, TaskType } from '../../../types';

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
      className={`flex gap-2 bg-slate-200 p-2 rounded-2xl odd:bg-slate-300 ${
        status === TaskStatusType.COMPLETED ? 'opacity-25' : ''
      }`}
    >
      <div className="p-2 rounded-xl flex-grow ">{content}</div>

      <button
        type="button"
        className="bg-lime-700 rounded-xl p-2"
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
        type="button"
        className="bg-lime-700 rounded-xl p-2"
        onClick={() => {
          onDeleteTask({ id });
        }}
      >
        <TrashIcon className="w-6 h-6 text-white" />
      </button>
    </li>
  );
}
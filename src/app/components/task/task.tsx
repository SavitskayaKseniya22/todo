import { TrashIcon, CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

import { TaskStatusType, TaskType } from "../../../types";

export default function Task({
  data,
  onChangeTask,
  onDeleteTask,
}: {
  data: TaskType;
  onChangeTask: ({ id, status }: { id: string; status: TaskStatusType }) => void;
  onDeleteTask: ({ id }: { id: string }) => void;
}) {
  const { content, status, id } = data;

  return (
    <li
      data-testid="task"
      data-status={status}
      className={`flex gap-2 rounded-2xl bg-slate-200 p-1 odd:bg-slate-300 sm:p-2 ${
        status === TaskStatusType.COMPLETED ? "opacity-25" : ""
      }`}
    >
      <div className="flex-grow rounded-xl p-2">{content}</div>

      <button
        data-testid="task-button-change"
        type="button"
        className="rounded-xl bg-lime-700 p-1 sm:p-2"
        onClick={() => {
          onChangeTask({ id, status });
        }}
      >
        {status === TaskStatusType.COMPLETED ? (
          <MinusCircleIcon className="h-6 w-6 text-white" />
        ) : (
          <CheckCircleIcon className="h-6 w-6 text-white" />
        )}
      </button>
      <button
        data-testid="task-button-remove"
        type="button"
        className="rounded-xl bg-lime-700 p-1 sm:p-2"
        onClick={() => {
          onDeleteTask({ id });
        }}
      >
        <TrashIcon className="h-6 w-6 text-white" />
      </button>
    </li>
  );
}

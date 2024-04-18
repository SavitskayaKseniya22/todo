'use client';

import Task from './components/task';
import { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { TaskStatusType, TaskListType, SortType } from '../../types';

const initialTasks: TaskListType = [
  {
    content: 'Do',
    id: 'qr4qyXIs',
    status: TaskStatusType.ACTIVE,
  },
  {
    content: 'Done',
    id: 'y6PBA6Yt',
    status: TaskStatusType.COMPLETED,
  },
  {
    content: 'Do',
    id: 'AITUi4Cq',
    status: TaskStatusType.ACTIVE,
  },
  {
    content: 'Do',
    id: '54U1RoBL',
    status: TaskStatusType.ACTIVE,
  },
  {
    content: 'Done',
    id: 'y6PBA6Bt',
    status: TaskStatusType.COMPLETED,
  },
];

function reducer(
  state: { tasks: TaskListType },
  action:
    | {
        type: 'complete-all' | 'clear-all' | 'clear-completed';
      }
    | {
        type: 'complete-task' | 'remove-task' | 'uncomplete-task';
        payload: { id: string };
      }
    | {
        type: 'add-task';
        payload: { content: string };
      }
) {
  switch (action.type) {
    case 'remove-task':
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload.id),
      };
    case 'complete-task':
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: TaskStatusType.COMPLETED }
            : item;
        }),
      };
    case 'uncomplete-task':
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return item.id === action.payload.id
            ? { ...item, status: TaskStatusType.ACTIVE }
            : item;
        }),
      };

    case 'clear-all':
      return {
        tasks: [],
      };
    case 'clear-completed':
      return {
        ...state,
        tasks: state.tasks.filter(
          (item) => item.status !== TaskStatusType.COMPLETED
        ),
      };
    case 'complete-all':
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          return { ...item, status: TaskStatusType.COMPLETED };
        }),
      };
    case 'add-task':
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

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { tasks: initialTasks });
  const [textValue, setTextValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textValue.length) {
      dispatch({ type: 'add-task', payload: { content: textValue } });
      setTextValue('');
    }
  };

  const [filterType, setFilterType] = useState<SortType>(SortType.ALL);

  return (
    <main className="flex flex-col h-svh items-center justify-between">
      <header className="w-full bg-lime-700">
        <div className="container m-auto">
          <h1 className="text-3xl p-4 text-white">ToDo</h1>
        </div>
      </header>
      <div className="flex items-center justify-center container m-auto flex-grow p-4 flex-col gap-4 overflow-auto">
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full bg-slate-200 p-4 text-black outline-none"
            placeholder="What are we going to do today?"
            name="text"
            onChange={handleChange}
            value={textValue}
          />
        </form>
        <ul className="flex-grow w-2/4 p-4 gap-4 flex flex-col overflow-auto ">
          {state.tasks
            .filter((item) => {
              switch (filterType) {
                case SortType.ALL:
                  return true;
                case SortType.ACTIVE:
                  return item.status === TaskStatusType.ACTIVE;
                case SortType.COMPLETED:
                  return item.status === TaskStatusType.COMPLETED;
              }
            })
            .map((task) => {
              return (
                <Task
                  data={task}
                  key={task.id}
                  onChangeTask={({
                    id,
                    status,
                  }: {
                    id: string;
                    status: TaskStatusType;
                  }) => {
                    if (status === TaskStatusType.COMPLETED) {
                      dispatch({ type: 'uncomplete-task', payload: { id } });
                    } else {
                      dispatch({ type: 'complete-task', payload: { id } });
                    }
                  }}
                  onDeleteTask={({ id }: { id: string }) => {
                    dispatch({ type: 'remove-task', payload: { id } });
                  }}
                ></Task>
              );
            })}
        </ul>
      </div>
      <footer className="bg-lime-700 w-full p-4">
        <div className="container m-auto text-white flex gap-16 justify-center items-center">
          <div>Tasks in list: {state.tasks.length}</div>
          <form className="flex gap-4">
            <input
              type="radio"
              name="task-sort"
              id="all"
              checked={filterType === SortType.ALL}
              className="hidden peer/all"
              onChange={(e) => {
                setFilterType(SortType.ALL);
              }}
            />
            <label
              htmlFor="all"
              className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/all:bg-slate-200 peer-checked/all:text-black"
            >
              All
            </label>

            <input
              type="radio"
              name="task-sort"
              id={SortType.COMPLETED}
              className="hidden peer/completed"
              checked={filterType === SortType.COMPLETED}
              onChange={(e) => {
                setFilterType(SortType.COMPLETED);
              }}
            />
            <label
              htmlFor="completed"
              className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/completed:bg-slate-200 peer-checked/completed:text-black"
            >
              Completed
            </label>

            <input
              type="radio"
              name="task-sort"
              id={SortType.ACTIVE}
              className="hidden peer/active"
              checked={filterType === SortType.ACTIVE}
              onChange={(e) => {
                setFilterType(SortType.ACTIVE);
              }}
            />

            <label
              htmlFor="active"
              className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/active:bg-slate-200 peer-checked/active:text-black"
            >
              Active
            </label>
          </form>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'clear-all' });
                }}
              >
                Clear all
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'clear-completed' });
                }}
              >
                Clear completed
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'complete-all' });
                }}
              >
                Complete all
              </button>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

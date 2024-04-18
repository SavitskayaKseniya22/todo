'use client';

import { useReducer } from 'react';
import { TaskStatusType, SortType, ActionType } from '../../types';
import Task from './components/task';
import reducer from './components/task-reducer';
import TaskInput from './components/task-input';
import Summary from './components/summary';
import TaskFilter from './components/task-filter';
import { initialTasks } from './components/tasks-initial-value';

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    tasks: initialTasks,
    sort: SortType.ALL,
  });

  return (
    <>
      <main className="flex flex-col items-center justify-between container flex-grow overflow-auto p-4 gap-8">
        <TaskInput
          onSumbit={(value) => {
            dispatch({
              type: ActionType.ADD_TASK,
              payload: { content: value },
            });
          }}
        />

        <ul className="flex-grow sm:p-4 lg:w-3/4 gap-4 flex flex-col overflow-auto w-full">
          {state.tasks
            .filter((item) => {
              switch (state.sort) {
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
                      dispatch({
                        type: ActionType.UNCOMPLETE_TASK,
                        payload: { id },
                      });
                    } else {
                      dispatch({
                        type: ActionType.COMPLETE_TASK,
                        payload: { id },
                      });
                    }
                  }}
                  onDeleteTask={({ id }: { id: string }) => {
                    dispatch({ type: ActionType.REMOVE_TASK, payload: { id } });
                  }}
                ></Task>
              );
            })}
        </ul>
      </main>

      <footer className="bg-lime-700 w-full">
        <div className="container m-auto text-white flex gap-4 md:gap-8 justify-center items-center p-4 flex-col md:flex-row">
          <Summary value={state.tasks.length} />
          <TaskFilter
            onSumbit={(sort) => {
              dispatch({
                type: ActionType.CHANGE_SORT,
                payload: { sort },
              });
            }}
          />

          <form className="flex gap-2 justify-evenly w-full md:flex-col md:w-1/5 items-start">
            <button
              type="button"
              onClick={() => {
                dispatch({ type: ActionType.CLEAR_ALL });
              }}
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: ActionType.CLEAR_COMPLETED });
              }}
            >
              Clear completed
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: ActionType.COMPLETE_ALL });
              }}
            >
              Complete all
            </button>
          </form>
        </div>
      </footer>
    </>
  );
}

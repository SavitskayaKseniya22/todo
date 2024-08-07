"use client";

import { useReducer } from "react";
import { TaskStatusType, SortType, ActionType } from "../types";
import Task from "./components/task/task";
import reducer from "./components/task-reducer";
import TaskInput from "./components/task-input/task-input";
import Summary from "./components/summary/summary";
import TaskFilter from "./components/task-filter/task-filter";
import { initialTasks } from "./components/tasks-initial-value";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    tasks: initialTasks,
    sort: SortType.ALL,
  });

  return (
    <>
      <main className="container flex flex-grow flex-col items-center justify-between gap-8 overflow-auto p-4">
        <TaskInput
          onSumbit={(value) => {
            dispatch({
              type: ActionType.ADD_TASK,
              payload: { content: value },
            });
          }}
        />

        <ul className="flex w-full flex-grow flex-col gap-4 overflow-auto sm:p-4 lg:w-3/4">
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
                  onChangeTask={({ id, status }: { id: string; status: TaskStatusType }) => {
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

      <footer className="w-full bg-lime-700">
        <div className="container m-auto flex flex-col items-center justify-center gap-4 p-4 text-white md:flex-row md:gap-8">
          <Summary value={state.tasks.length} />
          <TaskFilter
            onSumbit={(sort) => {
              dispatch({
                type: ActionType.CHANGE_SORT,
                payload: { sort },
              });
            }}
          />

          <form className="flex w-full items-start justify-evenly gap-2 md:w-1/5 md:flex-col">
            <button
              data-testid="tasks-clear-all"
              type="button"
              onClick={() => {
                dispatch({ type: ActionType.CLEAR_ALL });
              }}
            >
              Clear all
            </button>
            <button
              data-testid="tasks-clear-completed"
              type="button"
              onClick={() => {
                dispatch({ type: ActionType.CLEAR_COMPLETED });
              }}
            >
              Clear completed
            </button>
            <button
              data-testid="tasks-make-all-completed"
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

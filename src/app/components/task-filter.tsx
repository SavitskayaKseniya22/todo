import { Dispatch, SetStateAction } from 'react';
import { SortType } from '../../../types';

export default function TaskFilter({
  setFilterType,
  filterType,
}: {
  setFilterType: Dispatch<SetStateAction<SortType>>;
  filterType: string;
}) {
  return (
    <form className="flex gap-4 justify-evenly w-full md:w-3/6">
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
        className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/all:bg-slate-200 peer-checked/all:text-black flex-grow"
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
        className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/completed:bg-slate-200 peer-checked/completed:text-black flex-grow"
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
        className="flex rounded-xl border-solid border-2 p-2 cursor-pointer peer-checked/active:bg-slate-200 peer-checked/active:text-black flex-grow"
      >
        Active
      </label>
    </form>
  );
}

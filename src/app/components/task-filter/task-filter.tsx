import { useState } from "react";
import { SortType } from "../../../types";

export default function TaskFilter({ onSumbit }: { onSumbit: (sort: SortType) => void }) {
  const [filterType, setFilterType] = useState<SortType>(SortType.ALL);

  return (
    <form className="flex w-full justify-evenly gap-4 md:w-3/6">
      <input
        data-testid="filter-radio-all"
        type="radio"
        name="task-sort"
        id="all"
        checked={filterType === SortType.ALL}
        className="peer/all hidden"
        onChange={(e) => {
          setFilterType(SortType.ALL);
          onSumbit(SortType.ALL);
        }}
      />
      <label
        htmlFor="all"
        className="flex flex-grow cursor-pointer rounded-xl border-2 border-solid p-2 peer-checked/all:bg-slate-200 peer-checked/all:text-black"
      >
        All
      </label>

      <input
        data-testid="filter-radio-completed"
        type="radio"
        name="task-sort"
        id={SortType.COMPLETED}
        className="peer/completed hidden"
        checked={filterType === SortType.COMPLETED}
        onChange={(e) => {
          setFilterType(SortType.COMPLETED);
          onSumbit(SortType.COMPLETED);
        }}
      />
      <label
        htmlFor="completed"
        className="flex flex-grow cursor-pointer rounded-xl border-2 border-solid p-2 peer-checked/completed:bg-slate-200 peer-checked/completed:text-black"
      >
        Completed
      </label>

      <input
        data-testid="filter-radio-active"
        type="radio"
        name="task-sort"
        id={SortType.ACTIVE}
        className="peer/active hidden"
        checked={filterType === SortType.ACTIVE}
        onChange={(e) => {
          setFilterType(SortType.ACTIVE);
          onSumbit(SortType.ACTIVE);
        }}
      />

      <label
        htmlFor="active"
        className="flex flex-grow cursor-pointer rounded-xl border-2 border-solid p-2 peer-checked/active:bg-slate-200 peer-checked/active:text-black"
      >
        Active
      </label>
    </form>
  );
}

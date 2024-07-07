import { useState, ChangeEvent, FormEvent } from "react";

export default function TaskInput({ onSumbit }: { onSumbit: (value: string) => void }) {
  const [textValue, setTextValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textValue.length) {
      onSumbit(textValue);
      setTextValue("");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        data-testid={"task-creation-input"}
        type="text"
        className="w-full bg-slate-200 p-4 text-black outline-none"
        placeholder="What are we going to do today?"
        name="text"
        onChange={handleChange}
        value={textValue}
      />
    </form>
  );
}

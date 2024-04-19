export default function Summary({ value }: { value: number }) {
  return <div data-testid="summary">Tasks in list: {value}</div>;
}

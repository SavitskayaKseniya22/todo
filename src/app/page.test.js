import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './page.tsx';
import userEvent from '@testing-library/user-event';

describe('Tasks', () => {
  it('renders a task list', async () => {
    render(<Home />);
    const tasks = await screen.findAllByTestId('task');
    expect(tasks).toHaveLength(5);
  });

  it('clear all tasks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const button = await screen.findByTestId('tasks-clear-all');
    expect(button).toBeInTheDocument();
    await user.click(button);
    const tasks = screen.queryAllByTestId('task');
    expect(tasks).toHaveLength(0);
  });

  it('clear completed tasks', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const button = await screen.findByTestId('tasks-clear-completed');
    expect(button).toBeInTheDocument();
    await user.click(button);
    const tasks = await screen.findAllByTestId('task');
    expect(tasks).toHaveLength(3);
  });

  it('make all completed', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const button = await screen.findByTestId('tasks-make-all-completed');
    expect(button).toBeInTheDocument();
    await user.click(button);
    const tasks = await screen.findAllByTestId('task');
    expect(tasks).toHaveLength(5);
  });
});

import '@testing-library/jest-dom';
import { getByTestId, render, screen } from '@testing-library/react';
import Home from '../../page.tsx';
import userEvent from '@testing-library/user-event';

describe('Task', () => {
  it('renders a task', async () => {
    render(<Home />);
    const tasks = await screen.findAllByTestId('task');
    const task = tasks[0];
    expect(task).toBeInTheDocument();
    expect(task).toHaveTextContent('Do');
  });

  it('change a task', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const tasks = await screen.findAllByTestId('task');
    const task = tasks[0];

    const container = document.querySelector('[data-testid="task"]');
    const buttonOnChange = getByTestId(container, 'task-button-change');
    expect(buttonOnChange).toBeInTheDocument();

    expect(task).toHaveAttribute('data-status', 'active');

    await user.click(buttonOnChange);

    expect(task).toHaveAttribute('data-status', 'completed');

    await user.click(buttonOnChange);

    expect(task).toHaveAttribute('data-status', 'active');
  });

  it('remove a task', async () => {
    const user = userEvent.setup();

    render(<Home />);

    const tasks = await screen.findAllByTestId('task');
    const task = tasks[0];

    const container = document.querySelector('[data-testid="task"]');

    const buttonOnRemove = getByTestId(container, 'task-button-remove');

    expect(buttonOnRemove).toBeInTheDocument();

    await user.click(buttonOnRemove);

    expect(task).not.toBeInTheDocument();
  });
});

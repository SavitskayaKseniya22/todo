import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../page.tsx';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('render an input', async () => {
    render(<Home />);
    const input = await screen.findByTestId('task-creation-input');
    expect(input).toBeInTheDocument();
  });

  it('write to an input', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const input = await screen.findByTestId('task-creation-input');

    await user.type(input, 'Do some good!');
    expect(input).toHaveValue('Do some good!');
    await user.clear(input);
    expect(input).toHaveValue('');
  });

  it('submit the form', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = await screen.findByTestId('task-creation-input');

    await user.type(input, 'Do some good!');
    expect(input).toHaveValue('Do some good!');
    await user.keyboard('[Enter]');
    expect(input).toHaveValue('');
    const task = await screen.findByText('Do some good!');
    expect(task).toBeInTheDocument();
  });
});

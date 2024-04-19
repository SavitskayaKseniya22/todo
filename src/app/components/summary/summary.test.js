import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Summary from './summary.tsx';

describe('Summary', () => {
  it('renders a title', async () => {
    render(<Summary value={5} />);
    const title = await screen.findByTestId('summary');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Tasks in list:');
  });
  it('render a value', async () => {
    const value = Math.random();
    render(<Summary value={value} />);
    const title = await screen.findByTestId('summary');
    expect(title).toHaveTextContent(value);
  });
});

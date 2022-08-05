import { render, screen } from '@testing-library/react';
import App from './App';

test('Wordle', () => {
  render(<App />);
  const linkElement = screen.getByText('Wordle');
  expect(linkElement).toBeInTheDocument();
});

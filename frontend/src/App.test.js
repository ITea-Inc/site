import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders redesigned hero', () => {
  render(<App />);
  expect(screen.getByText(/Делаем сайты/i)).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';

import NotFound from '@/app/not-found';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/not-found',
  useSearchParams: () => new URLSearchParams(),
}));

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { name: /404/i })
    ).toBeInTheDocument();
  });

  it('renders page not found message', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('link', { name: /back to home/i })
    ).toBeInTheDocument();
  });

  it('renders search products link', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('link', { name: /search products/i })
    ).toBeInTheDocument();
  });

  it('renders popular pages links', () => {
    render(<NotFound />);
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/fashion/i)).toBeInTheDocument();
  });
});

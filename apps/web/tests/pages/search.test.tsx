import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchPage from '@/app/search/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/search',
  useSearchParams: () => new URLSearchParams(),
}));

describe('SearchPage', () => {
  it('renders search page heading', () => {
    render(<SearchPage />);
    expect(
      screen.getByRole('heading', { name: /search furniture/i })
    ).toBeInTheDocument();
  });

  it('renders search input', async () => {
    render(<SearchPage />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search for products/i)).toBeInTheDocument();
    });
  });

  it('shows search results when typing', async () => {
    const user = userEvent.setup();
    render(<SearchPage />);

    await waitFor(async () => {
      const searchInput = screen.getByPlaceholderText(/search for products/i);
      await user.type(searchInput, 'sofa');
    });

    await waitFor(() => {
      expect(screen.getByText(/found.*result/i)).toBeInTheDocument();
    });
  });
});

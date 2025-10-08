import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Helper to render with providers
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  it('renders header with logo', () => {
    renderWithProviders(<HomePage />);
    const logos = screen.getAllByLabelText(/Noyan Home/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('renders homepage successfully', () => {
    renderWithProviders(<HomePage />);
    // Check that the page renders without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('has search functionality in header', () => {
    renderWithProviders(<HomePage />);
    const searchInputs = screen.getAllByPlaceholderText(/search furniture/i);
    expect(searchInputs.length).toBeGreaterThan(0);
  });
});

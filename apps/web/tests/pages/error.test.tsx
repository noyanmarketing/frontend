/**
 * Error page tests
 * Note: Error component is a client component that requires React context
 * These tests verify the error boundary exists and exports correctly
 */

import Error from '@/app/error';

describe('Error', () => {
  it('exports error component', () => {
    expect(Error).toBeDefined();
    expect(typeof Error).toBe('function');
  });

  it('has correct component name', () => {
    expect(Error.name).toBe('Error');
  });
});

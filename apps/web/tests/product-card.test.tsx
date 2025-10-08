import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ui/product-card';

const mockProduct = {
  slug: 'test-product',
  title: 'Test Product',
  price: 99.99,
  currency: 'USD',
  brand: 'Test Brand',
};

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('links to product detail page', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/p/test-product');
  });
});

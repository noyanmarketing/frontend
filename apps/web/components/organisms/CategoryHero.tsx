import { Container } from '../ui/container';

interface CategoryHeroProps {
  title: string;
  description: string;
  productCount?: number;
  backgroundImage?: string;
}

export function CategoryHero({
  title,
  description,
  productCount,
  backgroundImage,
}: CategoryHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-deep-navy via-deep-navy-800 to-neutral-gray-900 text-white py-16 lg:py-20 overflow-hidden">
      {/* Background Pattern */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#FFD700_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#FFD700_0%,_transparent_50%)]" />
        </div>
      )}

      <Container>
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl text-neutral-gray-200 mb-4">{description}</p>
          {productCount !== undefined && (
            <p className="text-brand-gold font-semibold">
              {productCount} {productCount === 1 ? 'product' : 'products'}{' '}
              available
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

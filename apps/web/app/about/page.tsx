import { Award, Heart, Leaf, Shield, Sparkles, Users } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { generateSEO } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'About Us - Noyan Furniture',
  description:
    'Discover the story behind Noyan Furniture. We craft timeless, handmade furniture pieces that blend modern design with traditional craftsmanship. Learn about our values, commitment to sustainability, and dedication to quality.',
  url: 'https://noyan.com/about',
  type: 'website',
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-deep-navy-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-deep-navy via-deep-navy-800 to-neutral-gray-900 text-white py-20 lg:py-32">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <p className="text-sm font-semibold text-brand-gold">Est. 2020</p>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold">
                Crafting Timeless{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-400">
                  Elegance
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-gray-200 leading-relaxed">
                At Noyan, we believe furniture should be more than functional—it should tell a
                story. Every piece we create combines modern aesthetics with traditional
                craftsmanship.
              </p>
            </div>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-28">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep-navy dark:text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  We&apos;re on a mission to revolutionize how people experience furniture. By blending
                  time-honored craftsmanship with contemporary design, we create pieces that aren&apos;t
                  just beautiful—they&apos;re built to last generations.
                </p>
                <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  Every Noyan piece is meticulously handcrafted by skilled artisans who pour their
                  passion and expertise into every detail. We source only the finest sustainable
                  materials, ensuring that luxury and responsibility go hand in hand.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-brand-gold-100 via-neutral-gray-50 to-deep-navy-100 dark:from-deep-navy-800 dark:via-neutral-gray-800 dark:to-deep-navy-900 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-9xl opacity-20">✨</div>
                    <p className="text-neutral-gray-500 dark:text-neutral-gray-400 font-medium text-lg">
                      Quality Craftsmanship
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28 bg-neutral-gray-50 dark:bg-neutral-gray-900">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep-navy dark:text-white">
                Our Values
              </h2>
              <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Excellence
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  We never compromise on quality. Every piece undergoes rigorous quality control to
                  ensure it meets our exacting standards.
                </p>
              </div>

              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Sustainability
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  We&apos;re committed to protecting our planet. All our wood is sustainably sourced, and
                  we minimize waste at every step.
                </p>
              </div>

              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Craftsmanship
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  Our artisans bring decades of experience and genuine passion to every piece they
                  create. It&apos;s not just work—it&apos;s their art.
                </p>
              </div>

              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Community
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  We support local communities and fair labor practices. Every purchase helps
                  sustain skilled craftspeople and their families.
                </p>
              </div>

              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Trust
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  We stand behind every piece with our comprehensive 5-year warranty and exceptional
                  customer service.
                </p>
              </div>

              <div className="bg-white dark:bg-deep-navy-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-brand-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-4">
                  Innovation
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                  While respecting tradition, we embrace innovation. We constantly explore new
                  techniques and materials to push boundaries.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-28 bg-deep-navy text-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl md:text-6xl font-bold text-brand-gold font-heading mb-2">
                  50k+
                </p>
                <p className="text-neutral-gray-300 text-lg">Happy Customers</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-brand-gold font-heading mb-2">
                  500+
                </p>
                <p className="text-neutral-gray-300 text-lg">Premium Products</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-brand-gold font-heading mb-2">
                  100+
                </p>
                <p className="text-neutral-gray-300 text-lg">Skilled Artisans</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-brand-gold font-heading mb-2">
                  5
                </p>
                <p className="text-neutral-gray-300 text-lg">Year Warranty</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-28">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-deep-navy dark:text-white text-center">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-neutral-gray-600 dark:text-neutral-gray-300 leading-relaxed">
                <p>
                  Noyan Furniture was founded in 2020 with a simple vision: to create furniture that
                  people would treasure for a lifetime. What started as a small workshop with just
                  three artisans has grown into a thriving community of over 100 skilled
                  craftspeople.
                </p>
                <p>
                  Our founder, inspired by generations of furniture makers in their family, saw a gap
                  in the market for truly exceptional, handcrafted furniture that didn&apos;t compromise on
                  sustainability or ethics. Every piece of Noyan furniture is a labor of love,
                  combining traditional woodworking techniques passed down through generations with
                  modern design sensibilities.
                </p>
                <p>
                  Today, we&apos;re proud to serve over 50,000 customers worldwide, each one part of the
                  Noyan family. But despite our growth, we&apos;ve never lost sight of what makes us
                  special: our unwavering commitment to quality, craftsmanship, and the belief that
                  furniture should be beautiful, functional, and built to last.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

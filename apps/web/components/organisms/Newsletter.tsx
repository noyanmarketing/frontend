'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Container } from '../ui/container';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success
    setStatus('success');
    setEmail('');

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-deep-navy-900 via-deep-navy-800 to-deep-navy-900 dark:from-deep-navy-950 dark:via-deep-navy-900 dark:to-deep-navy-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#FFD700_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#FFD700_0%,_transparent_50%)]" />
      </div>

      <Container>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-brand-gold/20 border-2 border-brand-gold">
            <Mail className="w-8 h-8 text-brand-gold" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-neutral-gray-300 mb-8">
            Subscribe to get exclusive deals, design tips, and early access to new collections
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-neutral-gray-800 text-deep-navy dark:text-white border-2 border-transparent focus:border-brand-gold focus:outline-none"
              disabled={status === 'loading' || status === 'success'}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-brand-gold text-deep-navy hover:bg-brand-gold-600 font-bold px-8"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <p className="mt-4 text-brand-gold font-semibold">
              Thank you for subscribing! Check your inbox for a welcome gift.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-400 font-semibold">
              Something went wrong. Please try again.
            </p>
          )}

          {/* Privacy Note */}
          <p className="mt-6 text-sm text-neutral-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </Container>
    </section>
  );
}

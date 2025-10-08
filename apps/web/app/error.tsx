'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center">
      <Container>
        <div className="text-center py-20">
          <div className="mb-8">
            <h1 className="font-heading text-8xl md:text-9xl font-bold text-destructive mb-4">
              500
            </h1>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Something Went Wrong
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-2">
              We&apos;re sorry, but something unexpected happened. Our team has
              been notified.
            </p>
            {error.digest && (
              <p className="text-sm text-muted-foreground font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} size="lg">
              <span className="mr-2">🔄</span>
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/">
                <span className="mr-2">🏠</span>
                Back to Home
              </a>
            </Button>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 pt-8 border-t max-w-2xl mx-auto">
              <h3 className="font-semibold mb-4 text-left">
                Error Details (Development Mode)
              </h3>
              <div className="bg-muted p-4 rounded-lg text-left overflow-auto">
                <pre className="text-sm">
                  <code>{error.message}</code>
                </pre>
                {error.stack && (
                  <pre className="text-xs mt-4 text-muted-foreground">
                    <code>{error.stack}</code>
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

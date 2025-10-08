import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="mt-8 space-y-6">
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using this service, you accept and agree to
                  be bound by the terms and provision of this agreement.
                </p>
              </section>
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  Use License
                </h2>
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials on our website for personal, non-commercial
                  transitory viewing only.
                </p>
              </section>
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  Disclaimer
                </h2>
                <p>
                  The materials on our website are provided on an &apos;as
                  is&apos; basis. We make no warranties, expressed or implied,
                  and hereby disclaim all other warranties.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

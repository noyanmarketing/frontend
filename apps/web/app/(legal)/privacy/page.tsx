import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="font-heading text-4xl font-bold mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="mt-8 space-y-6">
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us when you
                  create an account, make a purchase, or communicate with us.
                </p>
              </section>
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to provide, maintain, and
                  improve our services, process transactions, and communicate
                  with you.
                </p>
              </section>
              <section>
                <h2 className="font-heading text-2xl font-semibold mb-3">
                  Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal information.
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

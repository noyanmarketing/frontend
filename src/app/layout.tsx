import "./globals.css";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Noyan Marketing",
  description: "E-ticaret",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <TopBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

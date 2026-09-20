import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { TransitionOverlay } from "@/components/TransitionOverlay";

export const metadata: Metadata = {
  title: "Lexus - The Relentless Pursuit of Perfection",
  description: "Experience the ultimate in luxury and performance with Lexus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TransitionOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

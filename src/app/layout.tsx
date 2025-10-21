import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans", // Đặt tên biến CSS là --font-sans
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Gear App - E-commerce Platform",
  description: "An e-commerce platform for tech enthusiasts",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          {children}
          <Toaster position="top-right" theme="light" />
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "JavaScript Practice Tests",
  description: "Improve your JavaScript skills with interactive coding challenges",
  openGraph: {
    title: "JavaScript Practice Tests",
    description: "Improve your JavaScript skills with interactive coding challenges",
    images: [
      {
        url: "/images/og-image-em.png",
        width: 1200,
        height: 630,
        alt: "JavaScript Practice Tests",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${spaceGrotesk.variable} font-sans h-full antialiased text-gray-900`}>
        {children}
        
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} JavaScript Practice Tests. By <Link href="https://elmir.dev" target="_blank" className="text-blue-500 hover:text-blue-600 hover:underline">Elmir Mammadli</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

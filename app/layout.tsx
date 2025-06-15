import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'FealtyX | Task Tracker',
  description: 'Developer & Manager Bug/Task Tracker',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      <body className="font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}

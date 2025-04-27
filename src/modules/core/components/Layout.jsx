import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ZaptBadge from './ZaptBadge';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
      <ZaptBadge />
    </div>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
            alt="Pajak CV KU Logo" 
            className="h-10 w-10 mr-3"
          />
          <Link to="/" className="text-xl font-bold">Pajak CV KU</Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors">Beranda</Link>
          <Link to="/about" className="hover:text-blue-200 transition-colors">Tentang</Link>
        </div>

        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 pt-2 pb-4">
          <Link 
            to="/" 
            className="block py-2 text-blue-100 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-blue-100 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tentang
          </Link>
        </div>
      )}
    </header>
  );
}
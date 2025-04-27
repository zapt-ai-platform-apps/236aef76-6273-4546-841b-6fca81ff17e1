import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link-active' : 'nav-link';
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="Pajak CV KU Logo" 
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-teal-700">Pajak CV KU</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={isActive('/')}>
              Dashboard
            </Link>
            <Link to="/pph-final" className={isActive('/pph-final')}>
              PPh Final
            </Link>
            <Link to="/ppn" className={isActive('/ppn')}>
              PPN
            </Link>
            <Link to="/npwp-validator" className={isActive('/npwp-validator')}>
              Validasi NPWP
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-700 hover:bg-teal-50 cursor-pointer"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/pph-final" 
              className={`block ${isActive('/pph-final')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              PPh Final
            </Link>
            <Link 
              to="/ppn" 
              className={`block ${isActive('/ppn')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              PPN
            </Link>
            <Link 
              to="/npwp-validator" 
              className={`block ${isActive('/npwp-validator')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Validasi NPWP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
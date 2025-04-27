import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              &copy; {currentYear} Pajak CV KU. Seluruh hak cipta.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 text-gray-400 text-sm text-center">
          <p>
            Disclaimer: Aplikasi ini bertujuan hanya sebagai alat bantu perhitungan dan informasi. 
            Pengguna disarankan tetap merujuk pada aturan perpajakan terbaru dan berkonsultasi dengan konsultan pajak.
          </p>
        </div>
      </div>
    </footer>
  );
}
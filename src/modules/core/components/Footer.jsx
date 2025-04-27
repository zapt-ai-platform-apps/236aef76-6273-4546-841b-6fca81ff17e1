import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Pajak CV KU - Aplikasi kalkulator pajak untuk CV di Indonesia
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Panduan penghitungan pajak berdasarkan peraturan terbaru
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-teal-600 text-sm">
              Beranda
            </Link>
            <Link to="/pph-final" className="text-gray-600 hover:text-teal-600 text-sm">
              PPh Final
            </Link>
            <Link to="/ppn" className="text-gray-600 hover:text-teal-600 text-sm">
              PPN
            </Link>
            <Link to="/npwp-validator" className="text-gray-600 hover:text-teal-600 text-sm">
              Validasi NPWP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
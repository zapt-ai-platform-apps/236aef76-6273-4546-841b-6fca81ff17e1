import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Pajak CV KU</h3>
            <p className="text-gray-600 text-sm">
              Aplikasi penghitung pajak untuk CV di Indonesia berdasarkan peraturan terbaru.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Perhitungan Pajak</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pph-final" className="text-gray-600 hover:text-teal-700">PPh Final</Link></li>
              <li><Link to="/pph21" className="text-gray-600 hover:text-teal-700">PPh Pasal 21</Link></li>
              <li><Link to="/pph22" className="text-gray-600 hover:text-teal-700">PPh Pasal 22</Link></li>
              <li><Link to="/pph23" className="text-gray-600 hover:text-teal-700">PPh Pasal 23</Link></li>
              <li><Link to="/pph4ayat2" className="text-gray-600 hover:text-teal-700">PPh Pasal 4(2)</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Perhitungan Lainnya</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/pph25" className="text-gray-600 hover:text-teal-700">PPh Pasal 25</Link></li>
              <li><Link to="/ppn" className="text-gray-600 hover:text-teal-700">PPN</Link></li>
              <li><Link to="/pph24" className="text-gray-600 hover:text-teal-700">PPh Pasal 24</Link></li>
              <li><Link to="/npwp-validator" className="text-gray-600 hover:text-teal-700">Validasi NPWP</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-teal-700 mb-4">Informasi</h3>
            <p className="text-gray-600 text-sm mb-4">
              Berdasarkan Peraturan Pemerintah (PP) No. 55 Tahun 2022 dan regulasi perpajakan terkait.
            </p>
            <p className="text-gray-600 text-sm">
              © {currentYear} Pajak CV KU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
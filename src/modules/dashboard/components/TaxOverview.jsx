import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export default function TaxOverview() {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-5 pattern-dots pattern-x-4 pattern-y-4 pattern-offset-2"></div>
      
      <h2 className="text-xl font-bold mb-4 relative z-10">Ringkasan Kewajiban Pajak CV</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <FaInfoCircle className="mr-2" /> PPh Final UMKM
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tarif 0,3% dari omzet bruto</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Berlaku untuk CV dengan omzet maksimal Rp4,8 miliar</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Masa penggunaan maksimal 4 tahun</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <FaInfoCircle className="mr-2" /> Pajak Pertambahan Nilai (PPN)
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Tarif 11% (berlaku saat ini)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Wajib dikukuhkan sebagai PKP jika omzet > Rp4,8 miliar</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Dapat mengajukan sebagai PKP secara sukarela</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-white/80 italic relative z-10">
        Berdasarkan Peraturan Pemerintah (PP) No. 55 Tahun 2022 dan regulasi perpajakan terkait
      </div>
    </div>
  );
}
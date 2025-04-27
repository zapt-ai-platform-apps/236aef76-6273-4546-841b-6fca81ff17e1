import React from 'react';
import PPNForm from './components/PPNForm';

export default function PPNCalculator() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Kalkulator PPN</h1>
        <p className="mt-1 text-sm text-gray-500">Hitung Pajak Pertambahan Nilai (PPN) untuk transaksi CV Anda</p>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Informasi PPN</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-700">
            <strong>Catatan Penting:</strong> CV dengan omzet melebihi Rp4,8 miliar per tahun wajib dikukuhkan sebagai
            Pengusaha Kena Pajak (PKP) dan memungut PPN. CV dengan omzet dibawah nilai tersebut dapat mengajukan permohonan
            secara sukarela untuk dikukuhkan sebagai PKP.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Ketentuan Umum PPN</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Tarif PPN saat ini adalah 11% (berlaku sejak 1 April 2022)</li>
            <li>PPN dikenakan atas penyerahan Barang Kena Pajak (BKP) dan/atau Jasa Kena Pajak (JKP)</li>
            <li>Pengusaha Kena Pajak (PKP) wajib memungut, menyetor, dan melaporkan PPN</li>
            <li>PKP wajib menerbitkan Faktur Pajak sebagai bukti pemungutan PPN</li>
            <li>Masa Pajak PPN adalah bulanan dan dilaporkan melalui SPT Masa PPN</li>
          </ul>
        </div>
        
        <PPNForm />
      </div>
    </div>
  );
}
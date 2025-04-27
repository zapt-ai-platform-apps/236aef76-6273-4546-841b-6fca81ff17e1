import React from 'react';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPHFinalResult({ result }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
      <h2 className="text-xl font-bold text-teal-700 mb-4">Hasil Perhitungan PPh Final</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm">Omzet Bruto Bulanan</p>
          <p className="text-xl font-bold text-gray-700">{formatRupiah(result.omzet)}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-sm">Tarif PPh Final</p>
          <p className="text-xl font-bold text-gray-700">0,3%</p>
        </div>
        
        <div className="p-4 bg-teal-50 rounded-lg">
          <p className="text-teal-600 text-sm">PPh Final yang Harus Dibayar</p>
          <p className="text-xl font-bold text-teal-700">{formatRupiah(result.taxAmount)}</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
          <span>PPh Final dibayarkan setiap bulan berdasarkan omzet bruto bulanan.</span>
        </p>
        <p className="flex items-center mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
          <span>Pembayaran dilakukan melalui kode billing pada DJP Online atau bank.</span>
        </p>
      </div>
    </div>
  );
}
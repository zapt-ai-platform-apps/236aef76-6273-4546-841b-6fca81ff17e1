import React from 'react';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPNResult({ result }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Hasil Perhitungan PPN</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 mb-1">Jenis Perhitungan</p>
          <p className="font-medium mb-4">
            {result.type === 'include' ? 'Harga Sudah Termasuk PPN' : 'Harga Belum Termasuk PPN'}
          </p>
          
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium">Dasar Pengenaan Pajak (DPP)</td>
                <td className="py-2 text-right">{formatRupiah(result.base)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">PPN (11%)</td>
                <td className="py-2 text-right">{formatRupiah(result.tax)}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Total</td>
                <td className="py-2 text-right font-bold">{formatRupiah(result.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="font-bold text-emerald-700 mb-3">Rincian Faktur Pajak</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Dasar Pengenaan Pajak (DPP)</p>
              <p className="text-lg font-bold">{formatRupiah(result.base)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">PPN (11%)</p>
              <p className="text-lg font-bold text-emerald-700">{formatRupiah(result.tax)}</p>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold">{formatRupiah(result.total)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <h3 className="font-medium text-gray-700 mb-2">Informasi PPN</h3>
        <ul className="space-y-1">
          <li>• Tarif PPN saat ini adalah 11% sesuai regulasi terkini di Indonesia.</li>
          <li>• Pengusaha Kena Pajak (PKP) wajib memungut PPN dari konsumen.</li>
          <li>• PKP wajib membuat Faktur Pajak sebagai bukti pemungutan PPN.</li>
          <li>• PPN yang dipungut harus disetorkan ke kas negara dan dilaporkan dalam SPT Masa PPN.</li>
        </ul>
      </div>
    </div>
  );
}
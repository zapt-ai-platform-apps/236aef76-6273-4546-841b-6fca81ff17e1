import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPH22Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const grossAmount = parseFloat(data.amount.replace(/[^\d]/g, ''));
    const transactionType = data.transactionType;
    const hasNPWP = data.hasNPWP === 'yes';
    let taxRate = 0;
    
    // Determine tax rate based on transaction type
    switch (transactionType) {
      case 'government':
        taxRate = 0.015; // 1.5%
        break;
      case 'import':
        taxRate = 0.075; // 7.5%
        break;
      case 'fuel':
        taxRate = 0.003; // 0.3%
        break;
      case 'luxury':
        taxRate = 0.05; // 5%
        break;
      default:
        taxRate = 0.015; // Default to 1.5%
    }
    
    // Apply 100% higher rate if no NPWP
    if (!hasNPWP) {
      taxRate = taxRate * 2;
    }
    
    const taxAmount = grossAmount * taxRate;
    
    setResult({
      grossAmount,
      transactionType,
      hasNPWP,
      taxRate,
      taxAmount: Math.round(taxAmount)
    });
  };
  
  const formatAmountInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Pasal 22</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 22</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 22 adalah pajak yang dipungut sehubungan dengan pembayaran atas pembelian barang, dan 
                kegiatan di bidang impor atau kegiatan usaha di bidang lain. CV dapat menjadi pemungut atau 
                dipungut PPh Pasal 22 dalam transaksi tertentu.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="transactionType" className="block text-gray-700 font-medium mb-2">
              Jenis Transaksi
            </label>
            <select
              id="transactionType"
              className="input-field"
              {...register('transactionType', { required: true })}
            >
              <option value="government">Pembelian Barang oleh Bendaharawan Pemerintah</option>
              <option value="import">Impor Barang</option>
              <option value="fuel">Pembelian Bahan Bakar</option>
              <option value="luxury">Pembelian Barang Mewah</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="hasNPWP" className="block text-gray-700 font-medium mb-2">
              Status NPWP
            </label>
            <select
              id="hasNPWP"
              className="input-field"
              {...register('hasNPWP', { required: true })}
            >
              <option value="yes">Memiliki NPWP</option>
              <option value="no">Tidak Memiliki NPWP</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Nilai Transaksi
            </label>
            <input
              id="amount"
              type="text"
              className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('amount', { 
                required: 'Nilai transaksi tidak boleh kosong',
                onChange: formatAmountInput
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung PPh Pasal 22
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">Hasil Perhitungan PPh Pasal 22</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Nilai Transaksi</td>
                    <td className="py-2 text-right">{formatRupiah(result.grossAmount)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Jenis Transaksi</td>
                    <td className="py-2 text-right">
                      {result.transactionType === 'government' && 'Pembelian Barang oleh Bendaharawan Pemerintah'}
                      {result.transactionType === 'import' && 'Impor Barang'}
                      {result.transactionType === 'fuel' && 'Pembelian Bahan Bakar'}
                      {result.transactionType === 'luxury' && 'Pembelian Barang Mewah'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Status NPWP</td>
                    <td className="py-2 text-right">
                      {result.hasNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif PPh Pasal 22</td>
                    <td className="py-2 text-right">{(result.taxRate * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-indigo-700">PPh Pasal 22</td>
                    <td className="py-2 text-right font-bold text-indigo-700">{formatRupiah(result.taxAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-indigo-700 mb-3">Keterangan</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  Tarif dasar: {(result.hasNPWP ? result.taxRate : result.taxRate / 2) * 100}%
                  {!result.hasNPWP && ' (x2 karena tidak memiliki NPWP)'}
                </p>
                
                <p>
                  Penghitungan: {(result.taxRate * 100).toFixed(1)}% x {formatRupiah(result.grossAmount)}
                </p>
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">PPh Pasal 22 yang dipungut:</p>
                  <p className="text-lg font-bold text-indigo-700 mt-1">
                    {formatRupiah(result.taxAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              PPh Pasal 22 dipungut oleh pihak pemungut dan wajib disetor ke kas negara melalui bank persepsi/Kantor Pos.
              Bukti pungut PPh Pasal 22 diberikan kepada pihak yang dipungut sebagai kredit pajak.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Informasi PPh Pasal 22 untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV dapat berada pada dua posisi terkait PPh Pasal 22:
          </p>
          
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              <strong>CV sebagai pihak yang dipungut</strong> - ketika CV melakukan transaksi dengan 
              pemungut PPh Pasal 22 seperti bendaharawan pemerintah atau badan tertentu.
            </li>
            <li>
              <strong>CV sebagai pemungut</strong> - dalam kondisi tertentu, CV dapat ditunjuk sebagai 
              pemungut PPh Pasal 22, misalnya jika CV adalah distributor resmi produk tertentu.
            </li>
          </ol>
          
          <p className="mt-3">
            Tarif PPh Pasal 22 bervariasi tergantung jenis transaksi, mulai dari 0,3% hingga 7,5%. 
            Jika pihak yang dipungut tidak memiliki NPWP, tarif yang dikenakan menjadi 100% lebih tinggi 
            dari tarif normal.
          </p>
        </div>
      </div>
    </div>
  );
}
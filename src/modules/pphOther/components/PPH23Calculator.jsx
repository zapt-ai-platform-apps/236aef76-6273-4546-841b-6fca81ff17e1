import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPH23Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const grossAmount = parseFloat(data.amount.replace(/[^\d]/g, ''));
    const transactionType = data.transactionType;
    const hasNPWP = data.hasNPWP === 'yes';
    
    // Determine tax rate based on transaction type
    let taxRate = transactionType === 'dividend' ? 0.15 : 0.02; // 15% for dividend, 2% for others
    
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
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Pasal 23</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 23</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 23 adalah pajak yang dipotong atas penghasilan yang diterima atau diperoleh Wajib Pajak 
                dalam negeri dan Bentuk Usaha Tetap (BUT) yang berasal dari modal, penyerahan jasa, 
                atau penyelenggaraan kegiatan selain yang telah dipotong PPh Pasal 21.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="transactionType" className="block text-gray-700 font-medium mb-2">
              Jenis Penghasilan
            </label>
            <select
              id="transactionType"
              className="input-field"
              {...register('transactionType', { required: true })}
            >
              <option value="rent">Sewa dan Penghasilan Lain dari Harta</option>
              <option value="techService">Jasa Teknik</option>
              <option value="management">Jasa Manajemen</option>
              <option value="consultant">Jasa Konsultan</option>
              <option value="dividend">Dividen</option>
              <option value="otherService">Jasa Lainnya</option>
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
              Jumlah Penghasilan Bruto
            </label>
            <input
              id="amount"
              type="text"
              className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('amount', { 
                required: 'Jumlah penghasilan tidak boleh kosong',
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
            Hitung PPh Pasal 23
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Hasil Perhitungan PPh Pasal 23</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Penghasilan Bruto</td>
                    <td className="py-2 text-right">{formatRupiah(result.grossAmount)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Jenis Penghasilan</td>
                    <td className="py-2 text-right">
                      {result.transactionType === 'rent' && 'Sewa dan Penghasilan Lain dari Harta'}
                      {result.transactionType === 'techService' && 'Jasa Teknik'}
                      {result.transactionType === 'management' && 'Jasa Manajemen'}
                      {result.transactionType === 'consultant' && 'Jasa Konsultan'}
                      {result.transactionType === 'dividend' && 'Dividen'}
                      {result.transactionType === 'otherService' && 'Jasa Lainnya'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Status NPWP</td>
                    <td className="py-2 text-right">
                      {result.hasNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif PPh Pasal 23</td>
                    <td className="py-2 text-right">{(result.taxRate * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-purple-700">PPh Pasal 23</td>
                    <td className="py-2 text-right font-bold text-purple-700">{formatRupiah(result.taxAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-purple-700 mb-3">Keterangan</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  Tarif dasar: {(result.hasNPWP ? result.taxRate : result.taxRate / 2) * 100}%
                  {!result.hasNPWP && ' (x2 karena tidak memiliki NPWP)'}
                </p>
                
                <p>
                  Penghitungan: {(result.taxRate * 100).toFixed(1)}% x {formatRupiah(result.grossAmount)}
                </p>
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">PPh Pasal 23 yang dipotong:</p>
                  <p className="text-lg font-bold text-purple-700 mt-1">
                    {formatRupiah(result.taxAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              CV yang melakukan pembayaran atas jasa atau penghasilan yang termasuk objek PPh Pasal 23 
              wajib memotong, menyetor, dan melaporkan PPh Pasal 23 tersebut. Bukti potong PPh Pasal 23 
              diberikan kepada pihak yang dipotong.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan PPh Pasal 23 untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV dapat berada pada dua posisi terkait PPh Pasal 23:
          </p>
          
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              <strong>CV sebagai pemotong</strong> - ketika CV membayar penghasilan yang merupakan objek 
              PPh Pasal 23 kepada pihak lain (Wajib Pajak dalam negeri atau BUT).
            </li>
            <li>
              <strong>CV sebagai pihak yang dipotong</strong> - ketika CV menerima penghasilan yang 
              merupakan objek PPh Pasal 23 dari pihak lain.
            </li>
          </ol>
          
          <p className="mt-3">
            <strong>Tarif PPh Pasal 23:</strong>
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>15% dari jumlah bruto atas dividen, bunga, royalti, dan hadiah/penghargaan</li>
            <li>2% dari jumlah bruto atas sewa dan penghasilan lain sehubungan dengan penggunaan harta</li>
            <li>2% dari jumlah bruto atas imbalan jasa teknik, jasa manajemen, jasa konsultan, dan jasa lain</li>
          </ul>
          
          <p className="mt-3">
            Jika penerima penghasilan tidak memiliki NPWP, tarif yang dikenakan menjadi 100% lebih tinggi 
            dari tarif normal. PPh Pasal 23 yang dipotong dapat dikreditkan dari PPh terutang pada tahun pajak 
            yang bersangkutan.
          </p>
        </div>
      </div>
    </div>
  );
}
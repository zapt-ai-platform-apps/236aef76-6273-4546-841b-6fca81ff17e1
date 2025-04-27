import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPH4Ayat2Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const grossAmount = parseFloat(data.amount.replace(/[^\d]/g, ''));
    const transactionType = data.transactionType;
    const hasNPWP = data.hasNPWP === 'yes';
    let taxRate = 0;
    
    // Determine tax rate based on transaction type
    switch (transactionType) {
      case 'landBuilding':
        taxRate = 0.025; // 2.5%
        break;
      case 'landBuilding2M':
        taxRate = 0.01; // 1%
        break;
      case 'construction':
        taxRate = 0.04; // 4%
        break;
      case 'constructionPlanning':
        taxRate = 0.06; // 6%
        break;
      case 'constructionSupervision':
        taxRate = 0.04; // 4%
        break;
      case 'rental':
        taxRate = 0.1; // 10%
        break;
      default:
        taxRate = 0.025; // Default to 2.5%
    }
    
    // Apply 100% higher rate if no NPWP for certain transaction types
    if (!hasNPWP && (transactionType === 'construction' || transactionType === 'constructionPlanning' || transactionType === 'constructionSupervision')) {
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
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Pasal 4 ayat (2)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 4 ayat (2)</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 4 ayat (2) adalah pajak final yang dikenakan atas jenis penghasilan tertentu 
                seperti pengalihan hak atas tanah dan/atau bangunan, persewaan tanah dan/atau bangunan,
                dan jasa konstruksi. CV wajib memotong atau membayar PPh Pasal 4 ayat (2) atas transaksi terkait.
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
              <option value="landBuilding">Pengalihan Hak atas Tanah dan/atau Bangunan (Umum)</option>
              <option value="landBuilding2M">Pengalihan Tanah/Bangunan Program Rumah Sederhana/RSS</option>
              <option value="construction">Jasa Konstruksi (Pelaksanaan)</option>
              <option value="constructionPlanning">Jasa Konstruksi (Perencanaan)</option>
              <option value="constructionSupervision">Jasa Konstruksi (Pengawasan)</option>
              <option value="rental">Persewaan Tanah dan/atau Bangunan</option>
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
            Hitung PPh Pasal 4 ayat (2)
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
          <h2 className="text-xl font-bold text-pink-700 mb-4">Hasil Perhitungan PPh Pasal 4 ayat (2)</h2>
          
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
                      {result.transactionType === 'landBuilding' && 'Pengalihan Hak atas Tanah dan/atau Bangunan (Umum)'}
                      {result.transactionType === 'landBuilding2M' && 'Pengalihan Tanah/Bangunan Program Rumah Sederhana/RSS'}
                      {result.transactionType === 'construction' && 'Jasa Konstruksi (Pelaksanaan)'}
                      {result.transactionType === 'constructionPlanning' && 'Jasa Konstruksi (Perencanaan)'}
                      {result.transactionType === 'constructionSupervision' && 'Jasa Konstruksi (Pengawasan)'}
                      {result.transactionType === 'rental' && 'Persewaan Tanah dan/atau Bangunan'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Status NPWP</td>
                    <td className="py-2 text-right">
                      {result.hasNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif PPh Pasal 4(2)</td>
                    <td className="py-2 text-right">{(result.taxRate * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-pink-700">PPh Pasal 4(2)</td>
                    <td className="py-2 text-right font-bold text-pink-700">{formatRupiah(result.taxAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-pink-700 mb-3">Keterangan</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  Tarif: {(result.taxRate * 100).toFixed(1)}% dari nilai transaksi
                  {!result.hasNPWP && (result.transactionType === 'construction' || result.transactionType === 'constructionPlanning' || result.transactionType === 'constructionSupervision') && ' (2x lipat karena tidak memiliki NPWP)'}
                </p>
                
                <p>
                  Penghitungan: {(result.taxRate * 100).toFixed(1)}% x {formatRupiah(result.grossAmount)}
                </p>
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">PPh Pasal 4(2) yang harus dibayar:</p>
                  <p className="text-lg font-bold text-pink-700 mt-1">
                    {formatRupiah(result.taxAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              PPh Pasal 4 ayat (2) bersifat final, artinya setelah dipotong atau dibayar, kewajiban pajak 
              telah selesai. Pajak yang telah dibayar tidak dapat dikreditkan dari PPh terutang.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan PPh Pasal 4 ayat (2) untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            PPh Pasal 4 ayat (2) adalah pajak yang bersifat final yang dikenakan atas jenis 
            penghasilan tertentu. Untuk CV, kewajiban terkait PPh Pasal 4 ayat (2) antara lain:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Sebagai pihak yang memotong</strong> - CV wajib memotong PPh Pasal 4 ayat (2) 
              ketika melakukan pembayaran atas persewaan tanah/bangunan atau jasa konstruksi.
            </li>
            <li>
              <strong>Sebagai pihak yang dipotong</strong> - CV dikenakan PPh Pasal 4 ayat (2) ketika 
              menerima penghasilan dari persewaan tanah/bangunan, jasa konstruksi, atau pengalihan 
              hak atas tanah/bangunan.
            </li>
            <li>
              <strong>Sebagai pihak yang menyetor sendiri</strong> - CV wajib menyetor sendiri PPh Pasal 4 ayat (2) 
              atas pengalihan hak atas tanah/bangunan.
            </li>
          </ul>
          
          <p className="mt-3">
            <strong>Tarif PPh Pasal 4 ayat (2) untuk transaksi umum:</strong>
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Pengalihan hak atas tanah dan/atau bangunan: 2,5%</li>
            <li>Persewaan tanah dan/atau bangunan: 10%</li>
            <li>Jasa konstruksi (pelaksanaan): 4%</li>
            <li>Jasa konstruksi (perencanaan): 6%</li>
            <li>Jasa konstruksi (pengawasan): 4%</li>
          </ul>
          
          <p className="mt-3">
            PPh Pasal 4 ayat (2) yang telah dibayar tidak dapat dikreditkan dari PPh terutang karena 
            bersifat final. CV wajib melaporkan pemotongan, pembayaran, atau penyetoran PPh Pasal 4 ayat (2) 
            dalam SPT Masa PPh Pasal 4 ayat (2).
          </p>
        </div>
      </div>
    </div>
  );
}
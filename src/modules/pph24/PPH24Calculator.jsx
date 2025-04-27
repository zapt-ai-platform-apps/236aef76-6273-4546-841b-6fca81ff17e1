import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../core/utils/formatCurrency';

export default function PPH24Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const foreignIncome = parseFloat(data.foreignIncome.replace(/[^\d]/g, ''));
    const foreignTaxPaid = parseFloat(data.foreignTaxPaid.replace(/[^\d]/g, ''));
    const domesticRate = 0.22; // 22% Indonesia corporate tax rate
    
    const potentialCredit = foreignIncome * domesticRate; // Maximum credit based on Indonesian tax rate
    const actualCredit = Math.min(potentialCredit, foreignTaxPaid); // Cannot exceed foreign tax paid
    
    setResult({
      foreignIncome,
      foreignTaxPaid,
      potentialCredit: Math.round(potentialCredit),
      actualCredit: Math.round(actualCredit),
      foreignTaxRate: foreignTaxPaid / foreignIncome,
      domesticRate
    });
  };
  
  const formatCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator Kredit Pajak PPh Pasal 24</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 24</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 24 adalah kredit pajak atas penghasilan dari luar negeri yang telah dikenakan 
                pajak di negara sumber penghasilan. CV yang menerima penghasilan dari luar negeri yang 
                telah dipotong/dibayar pajaknya di sana dapat mengkreditkan pajak tersebut dari PPh 
                terutang di Indonesia.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="foreignIncome" className="block text-gray-700 font-medium mb-2">
              Penghasilan dari Luar Negeri (dalam Rupiah)
            </label>
            <input
              id="foreignIncome"
              type="text"
              className={`input-field ${errors.foreignIncome ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('foreignIncome', { 
                required: 'Penghasilan dari luar negeri tidak boleh kosong',
                onChange: formatCurrencyInput
              })}
            />
            {errors.foreignIncome && (
              <p className="text-red-500 text-sm mt-1">{errors.foreignIncome.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="foreignTaxPaid" className="block text-gray-700 font-medium mb-2">
              Pajak yang Dibayar/Dipotong di Luar Negeri (dalam Rupiah)
            </label>
            <input
              id="foreignTaxPaid"
              type="text"
              className={`input-field ${errors.foreignTaxPaid ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('foreignTaxPaid', { 
                required: 'Pajak yang dibayar tidak boleh kosong',
                onChange: formatCurrencyInput
              })}
            />
            {errors.foreignTaxPaid && (
              <p className="text-red-500 text-sm mt-1">{errors.foreignTaxPaid.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung Kredit Pajak
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
          <h2 className="text-xl font-bold text-cyan-700 mb-4">Hasil Perhitungan Kredit Pajak (PPh Pasal 24)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Penghasilan dari Luar Negeri</td>
                    <td className="py-2 text-right">{formatRupiah(result.foreignIncome)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Pajak yang Dibayar di Luar Negeri</td>
                    <td className="py-2 text-right">{formatRupiah(result.foreignTaxPaid)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif Pajak di Luar Negeri</td>
                    <td className="py-2 text-right">{(result.foreignTaxRate * 100).toFixed(2)}%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif PPh Badan Indonesia</td>
                    <td className="py-2 text-right">{(result.domesticRate * 100).toFixed(1)}%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Potensi Kredit Pajak Maksimal</td>
                    <td className="py-2 text-right">{formatRupiah(result.potentialCredit)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-cyan-700">Kredit Pajak yang Dapat Digunakan</td>
                    <td className="py-2 text-right font-bold text-cyan-700">{formatRupiah(result.actualCredit)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-cyan-700 mb-3">Penjelasan</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  1. Penghasilan dari luar negeri dikenakan pajak di negara sumber sebesar {(result.foreignTaxRate * 100).toFixed(2)}%.
                </p>
                
                <p>
                  2. Jika penghasilan tersebut dikenakan pajak di Indonesia, tarif pajaknya adalah {(result.domesticRate * 100).toFixed(1)}%.
                </p>
                
                <p>
                  3. Kredit pajak maksimal yang dapat digunakan adalah nilai terendah antara:
                </p>
                
                <ul className="list-disc pl-5 mt-1 mb-1 space-y-1">
                  <li>Pajak yang dibayar di luar negeri: {formatRupiah(result.foreignTaxPaid)}</li>
                  <li>Pajak yang terutang di Indonesia: {formatRupiah(result.potentialCredit)}</li>
                </ul>
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">Kredit pajak yang dapat dikreditkan:</p>
                  <p className="text-lg font-bold text-cyan-700 mt-1">
                    {formatRupiah(result.actualCredit)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Kredit pajak ini dapat dikreditkan terhadap PPh Badan CV dalam tahun pajak yang sama. 
              Apabila pajak yang dibayar di luar negeri lebih besar dari kredit pajak yang diperkenankan, 
              kelebihannya tidak dapat dikompensasi ke tahun berikutnya.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan Kredit Pajak PPh Pasal 24
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV yang menerima penghasilan dari luar negeri dan telah membayar pajak di negara sumber penghasilan 
            dapat mengkreditkan pajak yang telah dibayar tersebut terhadap PPh terutang di Indonesia, 
            dengan ketentuan sebagai berikut:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Besarnya kredit pajak</strong> adalah nilai yang paling rendah antara:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Pajak yang dibayar/dipotong di luar negeri; atau</li>
                <li>Pajak yang terutang di Indonesia yang dihitung berdasarkan tarif PPh Indonesia atas penghasilan tersebut.</li>
              </ul>
            </li>
            <li>
              <strong>Bukti pembayaran pajak</strong> di luar negeri harus dilampirkan dalam SPT Tahunan PPh.
            </li>
            <li>
              <strong>Konversi nilai</strong> harus dilakukan ke dalam Rupiah dengan kurs yang ditetapkan oleh Menteri Keuangan 
              yang berlaku pada saat pajak di luar negeri terutang/dibayar.
            </li>
            <li>
              <strong>Persetujuan Penghindaran Pajak Berganda (P3B)</strong> antara Indonesia dengan negara sumber penghasilan 
              dapat mempengaruhi besarnya kredit pajak yang diperkenankan.
            </li>
          </ul>
          
          <p className="mt-3">
            Pengkreditan PPh Pasal 24 dilakukan dalam SPT Tahunan PPh Badan pada tahun pajak yang bersangkutan. 
            Jika kredit pajak tidak dapat digunakan seluruhnya (karena lebih besar dari PPh terutang), 
            kelebihan tersebut tidak dapat dikompensasi ke tahun pajak berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}
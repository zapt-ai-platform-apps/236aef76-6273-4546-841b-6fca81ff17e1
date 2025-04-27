import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPH25Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const netIncome = parseFloat(data.netIncome.replace(/[^\d]/g, ''));
    
    // Simplified PPh Badan calculation
    // Tarif PPh Badan: 22% untuk omzet > Rp50 miliar, atau 
    // 22% dengan pengurangan 50% untuk omzet ≤ Rp50 miliar
    
    const isSmallCorp = data.corpType === 'small';
    let taxRate = 0.22; // 22%
    
    if (isSmallCorp) {
      // 50% discount for corporations with revenue <= Rp50 billion
      taxRate = 0.22 * 0.5; // 11%
    }
    
    const annualTax = netIncome * taxRate;
    const monthlyInstallment = annualTax / 12;
    
    setResult({
      netIncome,
      isSmallCorp,
      taxRate,
      annualTax: Math.round(annualTax),
      monthlyInstallment: Math.round(monthlyInstallment)
    });
  };
  
  const formatIncomeInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Pasal 25</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 25</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 25 adalah angsuran Pajak Penghasilan yang harus dibayar sendiri oleh Wajib Pajak 
                untuk setiap bulan dalam tahun pajak berjalan. CV yang sudah tidak menggunakan tarif PPh Final 
                (setelah 4 tahun) wajib membayar angsuran PPh Pasal 25 berdasarkan tarif PPh Badan normal.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <div className="flex items-start">
            <FiAlertTriangle className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-orange-800 font-medium">Kalkulator untuk CV yang Tidak Menggunakan PPh Final</h3>
              <p className="text-orange-700 text-sm mt-1">
                Kalkulator ini hanya untuk CV yang sudah tidak menggunakan tarif PPh Final 0,3% (setelah 4 tahun) 
                dan beralih ke tarif PPh Badan normal. Jika CV Anda masih menggunakan PPh Final, silakan gunakan 
                kalkulator PPh Final.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="corpType" className="block text-gray-700 font-medium mb-2">
              Skala Usaha Berdasarkan Omzet
            </label>
            <select
              id="corpType"
              className="input-field"
              {...register('corpType', { required: true })}
            >
              <option value="small">CV dengan Omzet ≤ Rp50 miliar (Tarif Efektif 11%)</option>
              <option value="large">CV dengan Omzet > Rp50 miliar (Tarif 22%)</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="netIncome" className="block text-gray-700 font-medium mb-2">
              Estimasi Penghasilan Kena Pajak Tahunan
            </label>
            <input
              id="netIncome"
              type="text"
              className={`input-field ${errors.netIncome ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('netIncome', { 
                required: 'Penghasilan kena pajak tidak boleh kosong',
                onChange: formatIncomeInput
              })}
            />
            {errors.netIncome && (
              <p className="text-red-500 text-sm mt-1">{errors.netIncome.message}</p>
            )}
            <p className="text-sm text-gray-600 mt-1">
              Penghasilan kena pajak adalah laba fiskal setelah koreksi fiskal dan kompensasi kerugian.
            </p>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung PPh Pasal 25
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-orange-700 mb-4">Hasil Perhitungan PPh Pasal 25</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Penghasilan Kena Pajak</td>
                    <td className="py-2 text-right">{formatRupiah(result.netIncome)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Skala Usaha</td>
                    <td className="py-2 text-right">
                      {result.isSmallCorp ? 'Omzet ≤ Rp50 miliar' : 'Omzet > Rp50 miliar'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Tarif PPh Badan</td>
                    <td className="py-2 text-right">{(result.taxRate * 100).toFixed(1)}%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">PPh Badan Tahunan</td>
                    <td className="py-2 text-right">{formatRupiah(result.annualTax)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-orange-700">Angsuran PPh Pasal 25 per Bulan</td>
                    <td className="py-2 text-right font-bold text-orange-700">{formatRupiah(result.monthlyInstallment)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-orange-700 mb-3">Keterangan</h3>
              
              <div className="space-y-2 text-sm">
                <p>
                  Tarif PPh Badan: {(result.taxRate * 100).toFixed(1)}%
                  {result.isSmallCorp && ' (sudah termasuk fasilitas pengurangan 50%)'}
                </p>
                
                <p>
                  Penghitungan PPh Tahunan: {(result.taxRate * 100).toFixed(1)}% x {formatRupiah(result.netIncome)} = {formatRupiah(result.annualTax)}
                </p>
                
                <p>
                  Angsuran bulanan: {formatRupiah(result.annualTax)} ÷ 12 = {formatRupiah(result.monthlyInstallment)}
                </p>
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">Angsuran PPh Pasal 25 per bulan:</p>
                  <p className="text-lg font-bold text-orange-700 mt-1">
                    {formatRupiah(result.monthlyInstallment)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              CV wajib membayar angsuran PPh Pasal 25 setiap bulan paling lambat tanggal 15 bulan berikutnya.
              Angsuran ini nanti akan dikreditkan terhadap PPh Badan yang terutang dalam SPT Tahunan.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan PPh Pasal 25 untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV yang telah melewati masa penggunaan tarif PPh Final (4 tahun) wajib menggunakan tarif 
            PPh Badan normal dan membayar angsuran PPh Pasal 25 setiap bulan dengan ketentuan:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Tarif PPh Badan</strong> untuk CV dengan:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Omzet > Rp50 miliar: 22%</li>
                <li>Omzet ≤ Rp50 miliar: 22% dengan pengurangan 50% (efektif 11%)</li>
              </ul>
            </li>
            <li>
              <strong>Dasar penghitungan</strong> angsuran PPh Pasal 25:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Tahun pertama: berdasarkan estimasi penghasilan kena pajak</li>
                <li>Tahun-tahun berikutnya: berdasarkan SPT Tahunan tahun pajak sebelumnya</li>
              </ul>
            </li>
            <li>
              <strong>Contoh perhitungan:</strong> Jika penghasilan kena pajak CV diestimasi Rp500 juta/tahun 
              dan omzet ≤ Rp50 miliar, maka angsuran PPh Pasal 25 per bulan = (Rp500 juta x 11%) ÷ 12 = Rp4.583.333
            </li>
          </ul>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
            <div className="flex items-start">
              <FiAlertTriangle className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-orange-800 font-medium">Penting</h3>
                <p className="text-orange-700 text-sm mt-1">
                  CV harus mempersiapkan diri untuk beralih dari PPh Final ke tarif PPh Badan normal setelah 
                  4 tahun menggunakan PPh Final. Peralihan ini memerlukan penyesuaian administrasi perpajakan, 
                  termasuk pembukuan yang lebih detail dan perhitungan koreksi fiskal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
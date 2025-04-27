import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../../core/utils/formatCurrency';

export default function PPH21Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const grossSalary = parseFloat(data.salary.replace(/[^\d]/g, ''));
    const position = data.position;
    let taxAmount = 0;
    
    // Simplified PPh 21 calculation
    if (position === 'nonEmployeeTransactionWithNPWP') {
      // 5% x 50% x gross income
      taxAmount = grossSalary * 0.5 * 0.05;
    } else if (position === 'nonEmployeeTransactionNoNPWP') {
      // 6% x 50% x gross income
      taxAmount = grossSalary * 0.5 * 0.06;
    } else if (position === 'technicalService') {
      // 2% x gross income (with NPWP)
      taxAmount = grossSalary * 0.02;
    } else if (position === 'technicalServiceNoNPWP') {
      // 4% x gross income (without NPWP)
      taxAmount = grossSalary * 0.04;
    }
    
    setResult({
      grossSalary,
      position,
      taxAmount: Math.round(taxAmount)
    });
  };
  
  const formatSalaryInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Pasal 21</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Pasal 21</h3>
              <p className="text-blue-700 text-sm mt-1">
                PPh Pasal 21 adalah pajak atas penghasilan berupa gaji, upah, honorarium, dan pembayaran lain 
                yang diterima oleh orang pribadi. CV sebagai pemberi kerja/pembayar wajib memotong, 
                menyetor, dan melaporkan PPh Pasal 21 atas penghasilan yang dibayarkan.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
              Jenis Penghasilan
            </label>
            <select
              id="position"
              className="input-field"
              {...register('position', { required: true })}
            >
              <option value="nonEmployeeTransactionWithNPWP">Honorarium/Imbalan Jasa (Ada NPWP)</option>
              <option value="nonEmployeeTransactionNoNPWP">Honorarium/Imbalan Jasa (Tidak Ada NPWP)</option>
              <option value="technicalService">Jasa Teknik/Manajemen/Konsultan (Ada NPWP)</option>
              <option value="technicalServiceNoNPWP">Jasa Teknik/Manajemen/Konsultan (Tidak Ada NPWP)</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
              Jumlah Penghasilan Bruto
            </label>
            <input
              id="salary"
              type="text"
              className={`input-field ${errors.salary ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('salary', { 
                required: 'Jumlah penghasilan tidak boleh kosong',
                onChange: formatSalaryInput
              })}
            />
            {errors.salary && (
              <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung PPh Pasal 21
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Hasil Perhitungan PPh Pasal 21</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Penghasilan Bruto</td>
                    <td className="py-2 text-right">{formatRupiah(result.grossSalary)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Jenis Penghasilan</td>
                    <td className="py-2 text-right">
                      {result.position === 'nonEmployeeTransactionWithNPWP' && 'Honorarium/Imbalan Jasa (Ada NPWP)'}
                      {result.position === 'nonEmployeeTransactionNoNPWP' && 'Honorarium/Imbalan Jasa (Tidak Ada NPWP)'}
                      {result.position === 'technicalService' && 'Jasa Teknik/Manajemen/Konsultan (Ada NPWP)'}
                      {result.position === 'technicalServiceNoNPWP' && 'Jasa Teknik/Manajemen/Konsultan (Tidak Ada NPWP)'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-blue-700">PPh Pasal 21</td>
                    <td className="py-2 text-right font-bold text-blue-700">{formatRupiah(result.taxAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-3">Keterangan</h3>
              
              <div className="space-y-2 text-sm">
                {result.position === 'nonEmployeeTransactionWithNPWP' && (
                  <>
                    <p>Tarif: 5% x 50% x penghasilan bruto</p>
                    <p>Penghitungan: 5% x 50% x {formatRupiah(result.grossSalary)}</p>
                    <p>PPh Pasal 21 = {formatRupiah(result.taxAmount)}</p>
                  </>
                )}
                
                {result.position === 'nonEmployeeTransactionNoNPWP' && (
                  <>
                    <p>Tarif: 6% x 50% x penghasilan bruto</p>
                    <p>Penghitungan: 6% x 50% x {formatRupiah(result.grossSalary)}</p>
                    <p>PPh Pasal 21 = {formatRupiah(result.taxAmount)}</p>
                  </>
                )}
                
                {result.position === 'technicalService' && (
                  <>
                    <p>Tarif: 2% x penghasilan bruto</p>
                    <p>Penghitungan: 2% x {formatRupiah(result.grossSalary)}</p>
                    <p>PPh Pasal 21 = {formatRupiah(result.taxAmount)}</p>
                  </>
                )}
                
                {result.position === 'technicalServiceNoNPWP' && (
                  <>
                    <p>Tarif: 4% x penghasilan bruto</p>
                    <p>Penghitungan: 4% x {formatRupiah(result.grossSalary)}</p>
                    <p>PPh Pasal 21 = {formatRupiah(result.taxAmount)}</p>
                  </>
                )}
                
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">PPh Pasal 21 yang dipotong:</p>
                  <p className="text-lg font-bold text-blue-700 mt-1">
                    {formatRupiah(result.taxAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              CV wajib menyetorkan PPh Pasal 21 yang telah dipotong ke kas negara dan melaporkannya 
              dalam SPT Masa PPh Pasal 21 paling lambat tanggal 10 bulan berikutnya.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Kewajiban CV terkait PPh Pasal 21
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV sebagai pemberi kerja/pembayar memiliki kewajiban terkait PPh Pasal 21:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Memotong PPh Pasal 21 dari penghasilan yang dibayarkan kepada penerima penghasilan.</li>
            <li>Menyetor PPh Pasal 21 yang telah dipotong ke kas negara melalui bank persepsi/Kantor Pos.</li>
            <li>Melaporkan pemotongan dan penyetoran PPh Pasal 21 dalam SPT Masa PPh Pasal 21.</li>
            <li>Memberikan Bukti Potong PPh Pasal 21 kepada penerima penghasilan.</li>
            <li>Membuat dan menyampaikan SPT Tahunan PPh Pasal 21.</li>
          </ul>
          
          <p className="mt-3">
            <strong>Catatan penting:</strong> CV yang menggunakan tarif PPh Final 0,3% juga tetap wajib memotong, 
            menyetor, dan melaporkan PPh Pasal 21 atas penghasilan yang dibayarkan kepada pihak lain.
          </p>
        </div>
      </div>
    </div>
  );
}
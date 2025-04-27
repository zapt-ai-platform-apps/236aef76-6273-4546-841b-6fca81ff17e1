import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo, FiAlertCircle } from 'react-icons/fi';
import { formatRupiah } from '../core/utils/formatCurrency';
import PPHFinalResult from './components/PPHFinalResult';
import TimeLimitWarning from './components/TimeLimitWarning';

export default function PPHFinalCalculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  
  const onSubmit = (data) => {
    const omzetValue = parseFloat(data.omzet.replace(/[^\d]/g, ''));
    const taxAmount = omzetValue * 0.003; // 0.3% tax rate
    
    setResult({
      omzet: omzetValue,
      taxAmount: taxAmount,
      startYear: parseInt(data.startYear)
    });
    
    setStartYear(parseInt(data.startYear));
  };
  
  const formatOmzetInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPh Final (0,3%)</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPh Final UMKM</h3>
              <p className="text-blue-700 text-sm mt-1">
                Berdasarkan PP No. 55 Tahun 2022, CV dengan omzet maksimal Rp4,8 miliar per tahun 
                dapat menggunakan tarif PPh Final sebesar 0,3% dari omzet bruto. Fasilitas ini 
                hanya dapat digunakan selama maksimal 4 tahun pajak.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="omzet" className="block text-gray-700 font-medium mb-2">
              Omzet Bruto Bulanan
            </label>
            <input
              id="omzet"
              type="text"
              className={`input-field ${errors.omzet ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('omzet', { 
                required: 'Omzet tidak boleh kosong',
                onChange: formatOmzetInput
              })}
            />
            {errors.omzet && (
              <p className="text-red-500 text-sm mt-1">{errors.omzet.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="startYear" className="block text-gray-700 font-medium mb-2">
              Tahun Mulai Menggunakan PPh Final
            </label>
            <select
              id="startYear"
              className="input-field"
              {...register('startYear', { required: true })}
            >
              {Array.from({ length: 6 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung PPh Final
          </button>
        </form>
      </div>
      
      {result && (
        <>
          <PPHFinalResult result={result} />
          <TimeLimitWarning startYear={startYear} />
        </>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan Penggunaan PPh Final untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV dapat menggunakan tarif PPh Final 0,3% dengan syarat:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Memiliki peredaran bruto (omzet) tidak melebihi Rp4,8 miliar dalam 1 tahun pajak.</li>
            <li>Fasilitas ini hanya dapat digunakan selama maksimal 4 tahun pajak, yang terdiri dari:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>1 tahun pajak saat CV terdaftar pertama kali, dan</li>
                <li>3 tahun pajak berikutnya.</li>
              </ul>
            </li>
            <li>Setelah 4 tahun, CV akan dikenakan tarif PPh Badan normal.</li>
          </ul>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
            <div className="flex">
              <FiAlertCircle className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-orange-800 font-medium">Catatan Penting</h3>
                <p className="text-orange-700 text-sm mt-1">
                  Pastikan Anda memperhatikan batas waktu penggunaan tarif PPh Final. 
                  Jika sudah melewati 4 tahun pajak, CV Anda harus beralih ke tarif PPh Badan normal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
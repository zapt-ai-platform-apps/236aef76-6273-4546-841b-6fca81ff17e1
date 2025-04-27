import React, { useState } from 'react';
import { api as taxApi } from '@/modules/tax/api';

export default function PphFinalPage() {
  const [formData, setFormData] = useState({
    grossIncome: '',
    startDate: '',
    taxId: ''
  });
  
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'grossIncome' ? value.replace(/[^0-9]/g, '') : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    
    try {
      // Parse gross income to number
      const grossIncome = parseFloat(formData.grossIncome);
      
      if (isNaN(grossIncome) || grossIncome <= 0) {
        throw new Error('Omzet bruto harus berupa angka positif');
      }
      
      // Call tax calculation API
      const calculationResult = taxApi.calculatePphFinal({
        grossIncome,
        startDate: formData.startDate || undefined,
        taxId: formData.taxId || undefined
      });
      
      setResult(calculationResult);
    } catch (err) {
      console.error('Error calculating PPh Final:', err);
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Perhitungan PPh Final UMKM (0,3%)
        </h1>
        <p className="text-gray-600 mb-6">
          Untuk CV yang memenuhi kriteria sebagai Usaha Mikro, Kecil, dan Menengah (UMKM) 
          dengan omzet tidak melebihi Rp 4,8 miliar dalam satu tahun pajak.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="grossIncome" className="form-label">
              Omzet Bruto (Rp)
            </label>
            <input
              type="text"
              id="grossIncome"
              name="grossIncome"
              value={formData.grossIncome.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 1.000.000.000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="startDate" className="form-label">
              Tanggal Mulai Menggunakan PPh Final (Opsional)
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-input"
            />
            <p className="text-sm text-gray-500 mt-1">
              Digunakan untuk menghitung sisa masa penggunaan tarif PPh Final (maksimal 4 tahun)
            </p>
          </div>
          
          <div>
            <label htmlFor="taxId" className="form-label">
              NPWP (Opsional)
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="form-input"
              placeholder="XX.XXX.XXX.X-XXX.XXX"
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full md:w-auto cursor-pointer"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghitung...
                </span>
              ) : "Hitung PPh Final"}
            </button>
          </div>
        </form>
      </div>
      
      {result && (
        <div className="card bg-blue-50 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">Hasil Perhitungan</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Omzet Bruto</p>
                <p className="text-lg font-medium">{formatCurrency(result.grossIncome)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Tarif PPh Final</p>
                <p className="text-lg font-medium">{(result.taxRate * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">PPh Final Terutang</p>
                <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.taxAmount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Penghasilan Setelah Pajak</p>
                <p className="text-lg font-medium">{formatCurrency(result.netIncome)}</p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">Status Kelayakan</p>
              {result.eligibleForFinalTax ? (
                <p className="text-green-600 flex items-center">
                  <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  CV Anda memenuhi syarat untuk menggunakan tarif PPh Final 0,3%
                </p>
              ) : (
                <p className="text-red-600 flex items-center">
                  <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  CV Anda tidak memenuhi syarat karena omzet melebihi Rp 4,8 miliar
                </p>
              )}
            </div>
            
            {result.remainingEligibilityPeriod !== undefined && (
              <div>
                <p className="text-sm text-gray-600">Sisa Masa Penggunaan PPh Final</p>
                {result.remainingEligibilityPeriod > 0 ? (
                  <p className="text-blue-600">
                    {Math.floor(result.remainingEligibilityPeriod / 365)} tahun, {result.remainingEligibilityPeriod % 365} hari
                    <span className="text-sm text-gray-600 ml-2">
                      (Hingga {new Date(result.maxEligibilityDate).toLocaleDateString('id-ID')})
                    </span>
                  </p>
                ) : (
                  <p className="text-red-600">
                    Masa penggunaan tarif PPh Final telah berakhir pada {new Date(result.maxEligibilityDate).toLocaleDateString('id-ID')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="card bg-yellow-50 border border-yellow-100">
        <h3 className="text-lg font-semibold mb-3">Informasi Penting</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Tarif PPh Final 0,3% berlaku untuk CV dengan omzet tidak melebihi Rp 4,8 miliar dalam satu tahun pajak berdasarkan PP No. 55 Tahun 2022.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Penggunaan tarif PPh Final dibatasi maksimal 4 tahun sejak mulai digunakan.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Setelah 4 tahun, CV harus menggunakan tarif PPh Badan normal dan menghitung PPh Pasal 25.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { api as taxApi } from '@/modules/tax/api';
import { COUNTRIES_WITH_TAX_TREATIES, TAX_TREATY_RATES } from '@/modules/tax/constants';

export default function Pph24Page() {
  const [formData, setFormData] = useState({
    foreignIncome: '',
    foreignTaxPaid: '',
    countryCode: 'SG'
  });
  
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === 'foreignIncome' || name === 'foreignTaxPaid') 
        ? value.replace(/[^0-9]/g, '') 
        : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    
    try {
      // Parse values to numbers
      const foreignIncome = parseFloat(formData.foreignIncome);
      const foreignTaxPaid = parseFloat(formData.foreignTaxPaid);
      
      if (isNaN(foreignIncome) || foreignIncome <= 0) {
        throw new Error('Penghasilan luar negeri harus berupa angka positif');
      }
      
      if (isNaN(foreignTaxPaid) || foreignTaxPaid < 0) {
        throw new Error('Pajak yang dibayar di luar negeri tidak boleh negatif');
      }
      
      // Call tax calculation API
      const calculationResult = taxApi.calculatePph24({
        foreignIncome,
        foreignTaxPaid,
        countryCode: formData.countryCode
      });
      
      setResult(calculationResult);
    } catch (err) {
      console.error('Error calculating PPh 24:', err);
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
  
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Perhitungan Kredit Pajak PPh Pasal 24
        </h1>
        <p className="text-gray-600 mb-6">
          Perhitungan potensi pengkreditan Pajak Penghasilan (PPh) atas penghasilan yang 
          diperoleh CV dari luar negeri yang telah dipotong pajaknya di negara sumber.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="foreignIncome" className="form-label">
              Penghasilan dari Luar Negeri (Rp)
            </label>
            <input
              type="text"
              id="foreignIncome"
              name="foreignIncome"
              value={formData.foreignIncome.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 100000000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="foreignTaxPaid" className="form-label">
              Pajak yang Dibayar di Luar Negeri (Rp)
            </label>
            <input
              type="text"
              id="foreignTaxPaid"
              name="foreignTaxPaid"
              value={formData.foreignTaxPaid.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 20000000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="countryCode" className="form-label">
              Negara Sumber Penghasilan
            </label>
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="form-select"
              required
            >
              {COUNTRIES_WITH_TAX_TREATIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
              <option value="other">Negara Lainnya (Tanpa P3B)</option>
            </select>
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
              ) : "Hitung Kredit Pajak"}
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
                <p className="text-sm text-gray-600">Penghasilan dari Luar Negeri</p>
                <p className="text-lg font-medium">{formatCurrency(result.foreignIncome)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Pajak yang Dibayar di Luar Negeri</p>
                <p className="font-medium">{formatCurrency(result.foreignTaxPaid)}</p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Negara Sumber</p>
                <p className="font-medium">
                  {COUNTRIES_WITH_TAX_TREATIES.find(c => c.code === result.countryCode)?.name || 'Negara Lainnya'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Tarif P3B</p>
                <p className="font-medium">{formatPercentage(result.treatyRate)}</p>
                <p className="text-xs text-gray-500">
                  {result.countryCode !== 'default' 
                    ? 'Berdasarkan Perjanjian Penghindaran Pajak Berganda (P3B)' 
                    : 'Tidak ada P3B dengan Indonesia'}
                </p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Pajak Maksimum yang Dapat Dikreditkan</p>
                <p className="font-medium">{formatCurrency(result.maxCreditableTax)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Kredit Pajak PPh Pasal 24</p>
                <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.creditableTax)}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Efektif Tarif Pajak (setelah kredit)</p>
              <p className="font-medium">{formatPercentage(result.effectiveTaxRate)}</p>
            </div>
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
              PPh Pasal 24 merupakan kredit pajak atas penghasilan dari luar negeri yang sudah dikenakan pajak di negara sumber.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Kredit pajak maksimum adalah nilai terendah antara pajak yang dibayar di luar negeri dan pajak yang dihitung berdasarkan tarif P3B.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Kredit pajak PPh Pasal 24 menjadi pengurang PPh Badan yang terutang dalam SPT Tahunan.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
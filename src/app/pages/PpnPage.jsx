import React, { useState } from 'react';
import { api as taxApi } from '@/modules/tax/api';
import { PPN_THRESHOLD } from '@/modules/tax/constants';

export default function PpnPage() {
  const [formData, setFormData] = useState({
    salesAmount: '',
    inputTax: '',
    isPKP: false
  });
  
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value.replace(/[^0-9]/g, '')
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    
    try {
      // Parse values to numbers
      const salesAmount = parseFloat(formData.salesAmount);
      const inputTax = parseFloat(formData.inputTax) || 0;
      
      if (isNaN(salesAmount) || salesAmount <= 0) {
        throw new Error('Nilai penjualan harus berupa angka positif');
      }
      
      // Call tax calculation API
      const calculationResult = taxApi.calculatePpn({
        salesAmount,
        inputTax,
        isPKP: formData.isPKP
      });
      
      setResult(calculationResult);
    } catch (err) {
      console.error('Error calculating PPN:', err);
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
          Perhitungan PPN
        </h1>
        <p className="text-gray-600 mb-6">
          Perhitungan Pajak Pertambahan Nilai (PPN) bagi CV yang telah dikukuhkan sebagai 
          Pengusaha Kena Pajak (PKP) karena omzet melebihi Rp4,8 miliar atau pengajuan sukarela.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="salesAmount" className="form-label">
              Nilai Penjualan (Rp)
            </label>
            <input
              type="text"
              id="salesAmount"
              name="salesAmount"
              value={formData.salesAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 5000000000"
              required
            />
          </div>
          
          <div>
            <label htmlFor="inputTax" className="form-label">
              Pajak Masukan (Rp)
            </label>
            <input
              type="text"
              id="inputTax"
              name="inputTax"
              value={formData.inputTax.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 50000000"
            />
            <p className="text-sm text-gray-500 mt-1">
              PPN yang dibayarkan pada saat pembelian barang/jasa kena pajak
            </p>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPKP"
              name="isPKP"
              checked={formData.isPKP}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="isPKP" className="ml-2 text-sm text-gray-700">
              CV sudah dikukuhkan sebagai Pengusaha Kena Pajak (PKP)
            </label>
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
              ) : "Hitung PPN"}
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
                <p className="text-sm text-gray-600">Nilai Penjualan</p>
                <p className="text-lg font-medium">{formatCurrency(result.salesAmount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Status PKP</p>
                <p className="font-medium flex items-center">
                  {result.isPKP ? (
                    <svg className="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {result.isPKP ? 'Sudah Terdaftar sebagai PKP' : 'Belum Terdaftar sebagai PKP'}
                </p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            {!result.isPKP && (
              <div>
                <p className="text-sm font-medium mb-2">Status Kewajiban PKP:</p>
                <p className={`flex items-center ${result.isEligible ? 'text-red-600' : 'text-green-600'}`}>
                  {result.isEligible ? (
                    <>
                      <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      CV Anda WAJIB mendaftar sebagai PKP karena omzet melebihi Rp {formatCurrency(PPN_THRESHOLD)}
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      CV Anda belum wajib mendaftar PKP (omzet di bawah batas Rp {formatCurrency(PPN_THRESHOLD)})
                    </>
                  )}
                </p>
              </div>
            )}
            
            {result.isPKP && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tarif PPN</p>
                    <p className="font-medium">{(result.ppnRate * 100).toFixed(0)}%</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">PPN Keluaran (Output)</p>
                    <p className="font-medium">{formatCurrency(result.outputTax)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">PPN Masukan (Input)</p>
                    <p className="font-medium">{formatCurrency(result.inputTax)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">PPN yang Harus Disetor</p>
                    <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.ppnToBePaid)}</p>
                  </div>
                </div>
              </>
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
              CV wajib mendaftar sebagai PKP jika omzet dalam setahun melebihi Rp4,8 miliar.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              PPN yang harus disetor adalah selisih antara PPN Keluaran dan PPN Masukan.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              PPN saat ini ditetapkan sebesar 11% dari Dasar Pengenaan Pajak (DPP).
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
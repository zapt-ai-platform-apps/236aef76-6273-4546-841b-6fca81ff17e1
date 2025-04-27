import React, { useState } from 'react';
import { api as npwpApi } from '@/modules/npwp/api';

export default function NpwpValidationPage() {
  const [npwpNumber, setNpwpNumber] = useState('');
  const [result, setResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setNpwpNumber(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);
    
    try {
      if (!npwpNumber.trim()) {
        throw new Error('Nomor NPWP tidak boleh kosong');
      }
      
      // Call NPWP validation API
      const validationResult = npwpApi.validateNpwp({ npwpNumber });
      setResult(validationResult);
    } catch (err) {
      console.error('Error validating NPWP:', err);
      setError(err.message);
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Validasi NPWP
        </h1>
        <p className="text-gray-600 mb-6">
          Validasi Nomor Pokok Wajib Pajak (NPWP) untuk memastikan format yang benar 
          sesuai dengan ketentuan Direktorat Jenderal Pajak.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="npwpNumber" className="form-label">
              Nomor NPWP
            </label>
            <input
              type="text"
              id="npwpNumber"
              value={npwpNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Contoh: 09.123.123.1-123.123"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Masukkan 15 digit NPWP dengan atau tanpa format (titik dan strip)
            </p>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full md:w-auto cursor-pointer"
              disabled={isValidating}
            >
              {isValidating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memvalidasi...
                </span>
              ) : "Validasi NPWP"}
            </button>
          </div>
        </form>
      </div>
      
      {result && (
        <div className={`card ${result.isValid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
          <h2 className="text-xl font-semibold mb-4">Hasil Validasi</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${result.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {result.isValid ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`text-lg font-semibold ${result.isValid ? 'text-green-800' : 'text-red-800'}`}>
                  {result.isValid ? 'NPWP Valid' : 'NPWP Tidak Valid'}
                </p>
                {!result.isValid && result.errors.length > 0 && (
                  <p className="text-sm text-red-600">{result.errors.join(', ')}</p>
                )}
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">Format NPWP yang Benar</p>
              <p className="text-lg font-medium">
                {result.formattedNpwp || '-'}
              </p>
            </div>
            
            <div className="divider"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">ID Wajib Pajak</p>
                <p className="font-medium">{result.components.taxId || '-'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Kode Kantor Pajak</p>
                <p className="font-medium">{result.components.taxOfficeCode || '-'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Kode Status Pajak</p>
                <p className="font-medium">{result.components.taxStatusCode || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="card bg-yellow-50 border border-yellow-100">
        <h3 className="text-lg font-semibold mb-3">Informasi Format NPWP</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              NPWP terdiri dari 15 digit yang terbagi menjadi 3 bagian.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              9 digit pertama adalah ID Wajib Pajak.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              3 digit berikutnya adalah kode KPP (Kantor Pelayanan Pajak).
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              3 digit terakhir adalah kode status wajib pajak (cabang, pusat, dll).
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
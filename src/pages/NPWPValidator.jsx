import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';

export default function NPWPValidator() {
  const [npwp, setNpwp] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Remove non-digit characters
    value = value.replace(/\D/g, '');
    
    // Format NPWP as XX.XXX.XXX.X-XXX.XXX
    if (value.length > 0) {
      let formattedValue = '';
      
      for (let i = 0; i < value.length && i < 15; i++) {
        if (i === 2 || i === 5 || i === 8 || i === 9 || i === 12) {
          formattedValue += i === 9 ? '-' : '.';
        }
        formattedValue += value[i];
      }
      
      setNpwp(formattedValue);
    } else {
      setNpwp('');
    }
  };

  const validateNPWP = (e) => {
    e.preventDefault();
    
    // Remove formatting characters
    const cleanNpwp = npwp.replace(/[.-]/g, '');
    
    if (cleanNpwp.length !== 15) {
      setValidationResult({
        isValid: false,
        message: 'NPWP harus terdiri dari 15 digit angka.'
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate validation check (in a real app, this would make an API call)
    setTimeout(() => {
      // Simple validation logic
      // In a real system, this would check against DJP database or other validation service
      
      // Check if last 3 digits are valid (simple example only)
      const lastThreeDigits = parseInt(cleanNpwp.slice(12));
      
      if (lastThreeDigits >= 1 && lastThreeDigits <= 999) {
        setValidationResult({
          isValid: true,
          message: 'Format NPWP valid. Nomor NPWP dapat digunakan.'
        });
      } else {
        setValidationResult({
          isValid: false,
          message: 'Format NPWP tidak valid. Periksa kembali nomor NPWP.'
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <PageTitle 
        title="Validasi NPWP" 
        subtitle="Periksa keabsahan format Nomor Pokok Wajib Pajak (NPWP)"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Validasi NPWP</h2>
            
            <form onSubmit={validateNPWP}>
              <div className="form-group">
                <label htmlFor="npwp" className="block mb-1 text-gray-700 font-medium">
                  Nomor NPWP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="npwp"
                  value={npwp}
                  onChange={handleChange}
                  placeholder="XX.XXX.XXX.X-XXX.XXX"
                  className="box-border py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength="20"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Masukkan NPWP tanpa spasi (contoh: 01.234.567.8-123.456)
                </p>
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit" 
                  className="btn-primary cursor-pointer w-full md:w-auto"
                  disabled={loading || npwp.length < 10}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memvalidasi...
                    </span>
                  ) : 'Validasi NPWP'}
                </button>
              </div>
            </form>
            
            {validationResult && (
              <div className={`mt-6 p-4 border rounded-md ${validationResult.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start">
                  <div className={`p-1 rounded-full ${validationResult.isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mr-3`}>
                    {validationResult.isValid ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                      {validationResult.isValid ? 'NPWP Valid' : 'NPWP Tidak Valid'}
                    </h3>
                    <p className={`text-sm mt-1 ${validationResult.isValid ? 'text-green-700' : 'text-red-700'}`}>
                      {validationResult.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="section-title">Struktur NPWP</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                NPWP terdiri dari 15 digit angka yang diformat menjadi:
              </p>
              <div className="bg-gray-100 p-3 rounded-md font-mono">
                XX.XXX.XXX.X-XXX.XXX
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><span className="font-medium">2 digit pertama:</span> Identitas Wajib Pajak</li>
                <li><span className="font-medium">6 digit berikutnya:</span> Nomor Registrasi</li>
                <li><span className="font-medium">1 digit berikutnya:</span> Pengecekan</li>
                <li><span className="font-medium">3 digit berikutnya:</span> Kode KPP</li>
                <li><span className="font-medium">3 digit terakhir:</span> Status Cabang</li>
              </ul>
              <p className="text-sm italic">
                Catatan: Validator ini hanya memeriksa format NPWP. Untuk validasi penuh, hubungi Direktorat Jenderal Pajak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
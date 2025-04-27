import React, { useState } from 'react';
import Alert from '@/components/common/Alert';

const NPWPValidationPage = () => {
  const [npwp, setNpwp] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const formatNPWP = (input) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Format as XX.XXX.XXX.X-XXX.XXX
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}.${digits.slice(8)}`;
    } else if (digits.length <= 12) {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}.${digits.slice(8, 9)}-${digits.slice(9)}`;
    } else {
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}.${digits.slice(8, 9)}-${digits.slice(9, 12)}.${digits.slice(12, 15)}`;
    }
  };

  const handleNPWPChange = (e) => {
    const formatted = formatNPWP(e.target.value);
    setNpwp(formatted);
  };

  const validateNPWP = (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    // Remove formatting characters
    const cleanNPWP = npwp.replace(/[.-]/g, '');
    
    // Check if NPWP has the correct length (15 digits)
    const isValidLength = cleanNPWP.length === 15;
    
    // Check if all characters are numbers
    const isAllNumbers = /^\d+$/.test(cleanNPWP);
    
    // Additional check for the format (2-3-3-1-3-3 pattern)
    const isValidFormat = /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/.test(npwp);
    
    const isValid = isValidLength && isAllNumbers && isValidFormat;
    
    setValidationResult({
      isValid,
      errors: !isValid ? [
        ...(isValidLength ? [] : ['NPWP harus terdiri dari 15 digit']),
        ...(isAllNumbers ? [] : ['NPWP hanya boleh berisi angka']),
        ...(isValidFormat ? [] : ['Format NPWP tidak sesuai (XX.XXX.XXX.X-XXX.XXX)']),
      ] : [],
      npwp: npwp,
      cleanNPWP: cleanNPWP
    });
    
    setIsValidating(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Validasi Nomor Pokok Wajib Pajak (NPWP)</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Verifikasi Format NPWP</h2>
        
        <Alert
          type="info"
          message="NPWP terdiri dari 15 digit dan memiliki format XX.XXX.XXX.X-XXX.XXX"
          className="mb-6"
        />
        
        <form onSubmit={validateNPWP}>
          <div className="mb-4">
            <label htmlFor="npwp" className="block text-sm font-medium text-gray-700 mb-1">
              Nomor NPWP
            </label>
            <input
              type="text"
              id="npwp"
              className="input box-border"
              value={npwp}
              onChange={handleNPWPChange}
              placeholder="XX.XXX.XXX.X-XXX.XXX"
              required
              maxLength={20}
            />
            <p className="mt-1 text-sm text-gray-500">
              Contoh format yang benar: 07.000.000.9-999.999
            </p>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isValidating || !npwp}
          >
            {isValidating ? 'Memeriksa...' : 'Validasi NPWP'}
          </button>
        </form>
      </div>
      
      {validationResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Validasi</h2>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-1">NPWP yang Diperiksa</p>
            <p className="text-lg font-semibold">{validationResult.npwp}</p>
          </div>
          
          {validationResult.isValid ? (
            <Alert
              type="success"
              title="NPWP Valid"
              message="Format NPWP yang dimasukkan sesuai dengan ketentuan."
            />
          ) : (
            <Alert
              type="error"
              title="NPWP Tidak Valid"
              message={
                <ul className="list-disc list-inside mt-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              }
            />
          )}
          
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-medium mb-2">Catatan Penting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Validasi ini hanya memeriksa format NPWP, bukan keabsahan data di sistem DJP.</li>
              <li>Untuk memastikan keabsahan NPWP, silakan periksa melalui sistem resmi Direktorat Jenderal Pajak.</li>
              <li>NPWP terdiri dari 15 digit dan mengikuti format XX.XXX.XXX.X-XXX.XXX.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPWPValidationPage;
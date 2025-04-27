import React from 'react';
import { FiClock, FiAlertTriangle } from 'react-icons/fi';

export default function TimeLimitWarning({ startYear }) {
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - startYear;
  const yearsRemaining = Math.max(0, 4 - yearsPassed);
  
  const getStatusColor = () => {
    if (yearsPassed >= 4) return 'text-red-600';
    if (yearsPassed === 3) return 'text-orange-600';
    return 'text-green-600';
  };
  
  const getStatusMessage = () => {
    if (yearsPassed >= 4) {
      return 'Anda telah melewati batas waktu penggunaan PPh Final. Silakan gunakan tarif PPh Badan normal.';
    }
    if (yearsPassed === 3) {
      return `Anda berada di tahun terakhir penggunaan PPh Final. Mulai tahun depan, gunakan tarif PPh Badan normal.`;
    }
    return `Anda masih dapat menggunakan tarif PPh Final selama ${yearsRemaining} tahun lagi.`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-lg font-bold flex items-center mb-3">
        <FiClock className="mr-2" /> Status Batas Waktu PPh Final
      </h3>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-medium text-gray-700">Tahun mulai:</div>
            <div>{startYear}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-medium text-gray-700">Tahun saat ini:</div>
            <div>{currentYear}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-medium text-gray-700">Tahun yang telah berlalu:</div>
            <div>{yearsPassed} tahun</div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2 font-medium text-gray-700">Sisa waktu:</div>
            <div className={getStatusColor()}>
              {yearsRemaining > 0 ? `${yearsRemaining} tahun` : 'Habis'}
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            {yearsPassed >= 4 ? (
              <FiAlertTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
            ) : (
              <FiClock className={`${getStatusColor()} mt-1 mr-2 flex-shrink-0`} />
            )}
            <p className={`${getStatusColor()}`}>
              {getStatusMessage()}
            </p>
          </div>
        </div>
      </div>
      
      {yearsPassed >= 4 && (
        <div className="mt-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <div className="flex items-start">
            <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-red-800 font-medium">Perhatian</h4>
              <p className="text-red-700 text-sm mt-1">
                Mulai tahun pajak {startYear + 4}, CV Anda harus menggunakan tarif PPh Badan normal. 
                Silakan gunakan kalkulator PPh Pasal 25 untuk menghitung angsuran pajak bulanan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
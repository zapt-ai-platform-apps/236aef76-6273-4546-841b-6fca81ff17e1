import React from 'react';

export default function TaxResult({ 
  result, 
  calculationDate, 
  showTaxableIncome = false, 
  showTotalAmount = false,
  showInstallmentDetails = false
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatPercent = (rate) => {
    if (typeof rate === 'string') {
      return rate; // Already formatted (e.g., "1/12 per bulan")
    }
    return (rate * 100).toFixed(2) + '%';
  };
  
  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Hasil Perhitungan</h3>
      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Jenis Pajak:</span>
          <span className="font-medium">{result.type}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Dasar Pengenaan Pajak:</span>
          <span className="font-medium">{formatCurrency(result.baseAmount)}</span>
        </div>
        
        {showTaxableIncome && result.taxableIncome && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Penghasilan Kena Pajak:</span>
            <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
          </div>
        )}
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Tarif Pajak:</span>
          <span className="font-medium">{formatPercent(result.taxRate)}</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Jumlah Pajak Terutang:</span>
          <span className="font-medium text-blue-700">{formatCurrency(result.taxAmount)}</span>
        </div>
        
        {showTotalAmount && result.totalAmount && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Setelah Pajak:</span>
            <span className="font-medium">{formatCurrency(result.totalAmount)}</span>
          </div>
        )}
        
        {showInstallmentDetails && result.installmentPeriod && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Angsuran per Bulan:</span>
            <span className="font-medium">{formatCurrency(result.taxAmount)}</span>
          </div>
        )}
        
        {result.withNPWP !== undefined && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Status NPWP:</span>
            <span className="font-medium">{result.withNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP'}</span>
          </div>
        )}
        
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Waktu Perhitungan:</span>
          <span className="text-gray-600">
            {calculationDate.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md">
        <p>
          Ini hanya perhitungan estimasi. Untuk perhitungan resmi, konsultasikan dengan akuntan atau konsultan pajak.
        </p>
      </div>
    </div>
  );
}
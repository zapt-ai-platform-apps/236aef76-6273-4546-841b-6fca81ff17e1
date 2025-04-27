import React from 'react';

export default function TaxResult({ 
  title, 
  amount, 
  details = [], 
  note
}) {
  // Format the amount as IDR currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      
      <div className="bg-blue-50 rounded-md p-3 mb-4 border border-blue-100">
        <p className="text-xl font-bold text-blue-800">
          {formatCurrency(amount)}
        </p>
      </div>
      
      {details.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Detail perhitungan:</h4>
          <ul className="text-sm space-y-1">
            {details.map((detail, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-gray-600">{detail.label}</span>
                <span className="font-medium">{detail.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {note && (
        <div className="text-sm text-gray-600 border-t border-gray-200 pt-3 mt-3">
          <p><span className="font-medium">Catatan:</span> {note}</p>
        </div>
      )}
    </div>
  );
}
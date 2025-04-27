import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import PPHFinalForm from './components/PPHFinalForm';
import PPH21Form from './components/PPH21Form';
import PPH23Form from './components/PPH23Form';
import PPH4Form from './components/PPH4Form';
import PPH25Form from './components/PPH25Form';
import PPNForm from './components/PPNForm';

export default function TaxCalculator() {
  const [selectedTax, setSelectedTax] = useState('pphFinal');
  
  const taxTypes = [
    { id: 'pphFinal', name: 'PPh Final UMKM (0.3%)' },
    { id: 'pph21', name: 'PPh Pasal 21' },
    { id: 'pph23', name: 'PPh Pasal 23' },
    { id: 'pph4', name: 'PPh Pasal 4 ayat (2)' },
    { id: 'pph25', name: 'PPh Pasal 25' },
    { id: 'ppn', name: 'PPN' },
  ];
  
  const renderForm = () => {
    switch (selectedTax) {
      case 'pphFinal':
        return <PPHFinalForm />;
      case 'pph21':
        return <PPH21Form />;
      case 'pph23':
        return <PPH23Form />;
      case 'pph4':
        return <PPH4Form />;
      case 'pph25':
        return <PPH25Form />;
      case 'ppn':
        return <PPNForm />;
      default:
        return <PPHFinalForm />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Kalkulator Pajak</h1>
        <p className="mt-1 text-sm text-gray-500">Pilih dan hitung berbagai jenis pajak untuk CV Anda</p>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Pilih Jenis Pajak</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {taxTypes.map((tax) => (
            <button
              key={tax.id}
              className={`px-4 py-3 rounded-md border text-sm font-medium cursor-pointer flex items-center justify-between ${
                selectedTax === tax.id
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTax(tax.id)}
            >
              <span>{tax.name}</span>
              {selectedTax === tax.id && (
                <CheckCircleIcon className="h-5 w-5 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="card">
        {renderForm()}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import PPHFinalForm from './components/PPHFinalForm';
import PPH21Form from './components/PPH21Form';
import PPH23Form from './components/PPH23Form';
import PPH4Form from './components/PPH4Form';
import PPH25Form from './components/PPH25Form';

export default function PPHCalculator() {
  const [selectedTab, setSelectedTab] = useState('pphFinal');
  
  const tabs = [
    { id: 'pphFinal', name: 'PPh Final UMKM' },
    { id: 'pph21', name: 'PPh Pasal 21' },
    { id: 'pph23', name: 'PPh Pasal 23' },
    { id: 'pph4', name: 'PPh Pasal 4(2)' },
    { id: 'pph25', name: 'PPh Pasal 25' },
  ];
  
  const renderContent = () => {
    switch (selectedTab) {
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
      default:
        return <PPHFinalForm />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Kalkulator PPh</h1>
        <p className="mt-1 text-sm text-gray-500">Hitung berbagai jenis Pajak Penghasilan (PPh) untuk CV Anda</p>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="card">
        {renderContent()}
      </div>
    </div>
  );
}
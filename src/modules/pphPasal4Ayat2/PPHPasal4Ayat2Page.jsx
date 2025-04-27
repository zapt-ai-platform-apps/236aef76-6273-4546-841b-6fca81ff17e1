import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import Alert from '@/components/common/Alert';

const PPHPasal4Ayat2Page = () => {
  const [formData, setFormData] = useState({
    incomeType: 'property_rent',
    amount: '',
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const incomeTypes = [
    { id: 'property_rent', name: 'Sewa Tanah dan/atau Bangunan', rate: 0.10 },
    { id: 'construction_plan', name: 'Jasa Konstruksi - Perencanaan', rate: 0.04 },
    { id: 'construction_supervision', name: 'Jasa Konstruksi - Pengawasan', rate: 0.04 },
    { id: 'construction_execution', name: 'Jasa Konstruksi - Pelaksanaan', rate: 0.02 },
    { id: 'property_sale', name: 'Pengalihan Hak atas Tanah/Bangunan', rate: 0.025 },
    { id: 'bonds_interest', name: 'Bunga Obligasi', rate: 0.15 },
    { id: 'time_deposit', name: 'Bunga Deposito, Tabungan', rate: 0.20 },
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTax = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');

    try {
      // Parse input values
      const amount = parseFloat(formData.amount.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(amount)) {
        throw new Error('Mohon masukkan nilai penghasilan yang valid');
      }
      
      const selectedType = incomeTypes.find(type => type.id === formData.incomeType);
      const taxRate = selectedType.rate;
      const taxAmount = amount * taxRate;
      
      setTaxResult({
        incomeType: selectedType.name,
        amount,
        taxRate: taxRate * 100,
        taxAmount,
        netAmount: amount - taxAmount,
      });
      
    } catch (error) {
      setError(error.message);
      setTaxResult(null);
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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 4 Ayat (2)</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan PPh Final</h2>
        
        <form onSubmit={calculateTax}>
          <div className="mb-4">
            <label htmlFor="incomeType" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Penghasilan
            </label>
            <select
              id="incomeType"
              name="incomeType"
              value={formData.incomeType}
              onChange={handleSelectChange}
              className="select"
            >
              {incomeTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.rate * 100}%)
                </option>
              ))}
            </select>
          </div>
          
          <CurrencyInput
            id="amount"
            label="Nilai Penghasilan Bruto"
            value={formData.amount}
            onChange={(value) => handleInputChange('amount', value)}
            placeholder="0"
            required={true}
            error={!!error}
            helperText={error}
          />
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.amount}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPh Pasal 4 Ayat (2)'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPh Pasal 4 Ayat (2)</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Jenis Penghasilan</p>
              <p className="text-lg font-semibold">{taxResult.incomeType}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Penghasilan Bruto</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.amount)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Tarif PPh Final</p>
              <p className="text-lg font-semibold">{taxResult.taxRate}%</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">PPh Pasal 4 Ayat (2) yang Dipotong</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.taxAmount)}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Penghasilan Neto (Setelah Pajak)</p>
            <p className="text-lg font-semibold">{formatCurrency(taxResult.netAmount)}</p>
          </div>
          
          <Alert 
            type="info"
            title="Informasi"
            message={
              <>
                <p>PPh Pasal 4 Ayat (2) atau PPh Final adalah pajak penghasilan atas jenis penghasilan-penghasilan tertentu yang bersifat final dan tidak dapat dikreditkan dengan Pajak Penghasilan terutang.</p>
                <p className="mt-2">Penghasilan yang dikenai PPh Final tidak perlu digabung dengan penghasilan lain dalam perhitungan PPh pada SPT Tahunan.</p>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal4Ayat2Page;
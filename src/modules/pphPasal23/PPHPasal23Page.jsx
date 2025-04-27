import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import Alert from '@/components/common/Alert';

const PPHPasal23Page = () => {
  const [formData, setFormData] = useState({
    incomeType: 'service',
    amount: '',
    hasNPWP: true
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const incomeTypes = [
    { id: 'service', name: 'Jasa (2%)', rate: 0.02, rateWithoutNPWP: 0.04 },
    { id: 'rent', name: 'Sewa (selain tanah dan bangunan) (2%)', rate: 0.02, rateWithoutNPWP: 0.04 },
    { id: 'royalty', name: 'Royalti (15%)', rate: 0.15, rateWithoutNPWP: 0.3 },
    { id: 'prize', name: 'Hadiah & Penghargaan (15%)', rate: 0.15, rateWithoutNPWP: 0.3 },
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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
      
      let taxRate;
      if (formData.hasNPWP) {
        taxRate = selectedType.rate;
      } else {
        taxRate = selectedType.rateWithoutNPWP;
      }
      
      const taxAmount = amount * taxRate;
      
      setTaxResult({
        incomeType: selectedType.name,
        amount,
        taxRate: taxRate * 100,
        taxAmount,
        netAmount: amount - taxAmount,
        hasNPWP: formData.hasNPWP
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 23</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan PPh Pasal 23</h2>
        
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
                  {type.name}
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
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasNPWP"
                name="hasNPWP"
                checked={formData.hasNPWP}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasNPWP" className="ml-2 text-sm text-gray-700">
                Memiliki NPWP
              </label>
            </div>
            {!formData.hasNPWP && (
              <p className="mt-1 text-sm text-yellow-600">
                Tarif pajak akan menjadi 2x lipat karena tidak memiliki NPWP
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.amount}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPh Pasal 23'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPh Pasal 23</h2>
          
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
              <p className="text-gray-600 mb-1">Tarif PPh Pasal 23</p>
              <p className="text-lg font-semibold">{taxResult.taxRate}%</p>
              {!taxResult.hasNPWP && (
                <p className="text-sm text-yellow-600">
                  (Tarif 2x lipat karena tidak memiliki NPWP)
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">PPh Pasal 23 yang Dipotong</p>
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
                <p>PPh Pasal 23 dikenakan atas penghasilan yang diterima wajib pajak dalam negeri atau BUT yang berasal dari modal, penyerahan jasa, atau penyelenggaraan kegiatan selain yang telah dipotong PPh Pasal 21.</p>
                <p className="mt-2">Penerima penghasilan yang dipotong PPh Pasal 23 adalah CV, wajib pajak badan termasuk BUT, atau wajib pajak orang pribadi yang menjalankan usaha atau melakukan kegiatan bebas.</p>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal23Page;
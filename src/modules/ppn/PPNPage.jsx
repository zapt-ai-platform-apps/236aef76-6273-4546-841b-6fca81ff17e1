import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import PercentageInput from '@/components/common/PercentageInput';
import Alert from '@/components/common/Alert';

const PPNPage = () => {
  const [formData, setFormData] = useState({
    calculationType: 'inclusive', // 'inclusive' or 'exclusive'
    amount: '',
    ppnRate: '11',
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePPN = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');

    try {
      // Parse input values
      const amount = parseFloat(formData.amount.replace(/\./g, '').replace(',', '.'));
      const ppnRate = parseFloat(formData.ppnRate) / 100;
      
      if (isNaN(amount)) {
        throw new Error('Mohon masukkan nilai jumlah yang valid');
      }
      
      if (isNaN(ppnRate) || ppnRate <= 0) {
        throw new Error('Mohon masukkan tarif PPN yang valid');
      }
      
      let ppnAmount, baseAmount, totalAmount;
      
      if (formData.calculationType === 'inclusive') {
        // If the amount includes PPN
        baseAmount = amount / (1 + ppnRate);
        ppnAmount = amount - baseAmount;
        totalAmount = amount;
      } else {
        // If the amount excludes PPN
        baseAmount = amount;
        ppnAmount = amount * ppnRate;
        totalAmount = amount + ppnAmount;
      }
      
      setTaxResult({
        calculationType: formData.calculationType,
        ppnRate: ppnRate * 100,
        baseAmount,
        ppnAmount,
        totalAmount
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPN</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan Pajak Pertambahan Nilai (PPN)</h2>
        
        <form onSubmit={calculatePPN}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Perhitungan</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inclusive"
                  name="calculationType"
                  value="inclusive"
                  checked={formData.calculationType === 'inclusive'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="inclusive" className="ml-2 text-sm text-gray-700">
                  Harga Sudah Termasuk PPN
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="exclusive"
                  name="calculationType"
                  value="exclusive"
                  checked={formData.calculationType === 'exclusive'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="exclusive" className="ml-2 text-sm text-gray-700">
                  Harga Belum Termasuk PPN
                </label>
              </div>
            </div>
          </div>
          
          <CurrencyInput
            id="amount"
            label={formData.calculationType === 'inclusive' ? 'Harga (Termasuk PPN)' : 'Harga (Belum Termasuk PPN)'}
            value={formData.amount}
            onChange={(value) => handleInputChange('amount', value)}
            placeholder="0"
            required={true}
            error={!!error}
            helperText={error}
          />
          
          <PercentageInput
            id="ppnRate"
            label="Tarif PPN"
            value={formData.ppnRate}
            onChange={(value) => handleInputChange('ppnRate', value)}
            placeholder="11"
            min={0}
            max={100}
            helperText="Tarif PPN saat ini adalah 11%"
          />
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.amount}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPN'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPN</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Tarif PPN</p>
              <p className="text-lg font-semibold">{taxResult.ppnRate}%</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Dasar Pengenaan Pajak (DPP)</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.baseAmount)}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-1">Jumlah PPN</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.ppnAmount)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Total (DPP + PPN)</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.totalAmount)}</p>
            </div>
          </div>
          
          <Alert 
            type="info"
            title="Informasi"
            message={
              <>
                <p>Sejak 1 April 2022, tarif PPN di Indonesia adalah 11%.</p>
                <p className="mt-2">CV yang memiliki omzet lebih dari Rp4,8 miliar dalam satu tahun pajak wajib dikukuhkan sebagai Pengusaha Kena Pajak (PKP) dan melakukan pemungutan PPN.</p>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPNPage;
import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import PercentageInput from '@/components/common/PercentageInput';
import Alert from '@/components/common/Alert';

const PPHPasal22Page = () => {
  const [formData, setFormData] = useState({
    transactionType: 'import',
    amount: '',
    customRate: '',
    useCustomRate: false,
    hasNPWP: true
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const transactionTypes = [
    { id: 'import', name: 'Impor', rate: 0.075, rateWithoutNPWP: 0.15 },
    { id: 'government', name: 'Pembelian Barang oleh Pemerintah', rate: 0.015, rateWithoutNPWP: 0.03 },
    { id: 'distributor', name: 'Pembelian oleh Distributor', rate: 0.0025, rateWithoutNPWP: 0.005 },
    { id: 'custom', name: 'Tarif Khusus/Lainnya', rate: null, rateWithoutNPWP: null }
  ];

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      useCustomRate: value === 'custom'
    }));
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
        throw new Error('Mohon masukkan nilai jumlah yang valid');
      }
      
      let taxRate;
      let transactionTypeName;
      
      if (formData.useCustomRate) {
        taxRate = parseFloat(formData.customRate) / 100;
        transactionTypeName = 'Tarif Khusus/Lainnya';
        
        if (isNaN(taxRate) || taxRate < 0) {
          throw new Error('Mohon masukkan tarif pajak yang valid');
        }
      } else {
        const selectedType = transactionTypes.find(type => type.id === formData.transactionType);
        transactionTypeName = selectedType.name;
        
        if (formData.hasNPWP) {
          taxRate = selectedType.rate;
        } else {
          taxRate = selectedType.rateWithoutNPWP;
        }
      }
      
      const taxAmount = amount * taxRate;
      
      setTaxResult({
        transactionType: transactionTypeName,
        amount,
        taxRate: taxRate * 100,
        taxAmount,
        totalAmount: amount + taxAmount,
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 22</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan PPh Pasal 22</h2>
        
        <form onSubmit={calculateTax}>
          <div className="mb-4">
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Transaksi
            </label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleSelectChange}
              className="select"
            >
              {transactionTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          {formData.useCustomRate && (
            <PercentageInput
              id="customRate"
              label="Tarif Pajak Khusus"
              value={formData.customRate}
              onChange={(value) => handleInputChange('customRate', value)}
              placeholder="0"
              required={true}
              error={formData.useCustomRate && !formData.customRate}
              helperText={formData.useCustomRate && !formData.customRate ? 'Mohon masukkan tarif pajak' : ''}
            />
          )}
          
          <CurrencyInput
            id="amount"
            label="Nilai Transaksi"
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
                disabled={formData.useCustomRate}
              />
              <label htmlFor="hasNPWP" className="ml-2 text-sm text-gray-700">
                Memiliki NPWP
              </label>
            </div>
            {!formData.useCustomRate && !formData.hasNPWP && (
              <p className="mt-1 text-sm text-yellow-600">
                Tarif pajak akan menjadi 2x lipat karena tidak memiliki NPWP
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.amount || (formData.useCustomRate && !formData.customRate)}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPh Pasal 22'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPh Pasal 22</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Jenis Transaksi</p>
              <p className="text-lg font-semibold">{taxResult.transactionType}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Nilai Transaksi</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.amount)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Tarif PPh Pasal 22</p>
              <p className="text-lg font-semibold">{taxResult.taxRate}%</p>
              {!formData.useCustomRate && !taxResult.hasNPWP && (
                <p className="text-sm text-yellow-600">
                  (Tarif 2x lipat karena tidak memiliki NPWP)
                </p>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">PPh Pasal 22 yang Dipungut</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.taxAmount)}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Jumlah Total (Termasuk Pajak)</p>
            <p className="text-lg font-semibold">{formatCurrency(taxResult.totalAmount)}</p>
          </div>
          
          <Alert 
            type="info"
            title="Informasi"
            message={
              <>
                <p>PPh Pasal 22 merupakan pajak yang dipungut oleh:</p>
                <ul className="list-disc list-inside mt-1 ml-2">
                  <li>Bendaharawan pemerintah</li>
                  <li>Badan-badan tertentu</li>
                  <li>Wajib pajak badan yang melakukan penjualan barang yang tergolong sangat mewah</li>
                </ul>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal22Page;
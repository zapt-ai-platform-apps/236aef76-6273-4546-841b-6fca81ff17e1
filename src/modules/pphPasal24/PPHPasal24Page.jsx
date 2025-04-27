import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import PercentageInput from '@/components/common/PercentageInput';
import Alert from '@/components/common/Alert';

const PPHPasal24Page = () => {
  const [formData, setFormData] = useState({
    foreignIncome: '',
    foreignTaxRate: '',
    foreignTaxPaid: '',
    domesticTaxRate: '22'
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [foreignTaxCalculationMethod, setForeignTaxCalculationMethod] = useState('rate'); // 'rate' or 'amount'

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setForeignTaxCalculationMethod(e.target.value);
  };

  const calculateTax = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');

    try {
      // Parse input values
      const foreignIncome = parseFloat(formData.foreignIncome.replace(/\./g, '').replace(',', '.'));
      const domesticTaxRate = parseFloat(formData.domesticTaxRate) / 100;
      
      if (isNaN(foreignIncome)) {
        throw new Error('Mohon masukkan nilai penghasilan luar negeri yang valid');
      }
      
      if (isNaN(domesticTaxRate)) {
        throw new Error('Mohon masukkan tarif pajak dalam negeri yang valid');
      }
      
      let foreignTaxPaid;
      
      if (foreignTaxCalculationMethod === 'rate') {
        const foreignTaxRate = parseFloat(formData.foreignTaxRate) / 100;
        
        if (isNaN(foreignTaxRate)) {
          throw new Error('Mohon masukkan tarif pajak luar negeri yang valid');
        }
        
        foreignTaxPaid = foreignIncome * foreignTaxRate;
      } else {
        foreignTaxPaid = parseFloat(formData.foreignTaxPaid.replace(/\./g, '').replace(',', '.'));
        
        if (isNaN(foreignTaxPaid)) {
          throw new Error('Mohon masukkan jumlah pajak yang dibayar di luar negeri yang valid');
        }
      }
      
      // Calculate domestic tax on foreign income
      const domesticTaxOnForeignIncome = foreignIncome * domesticTaxRate;
      
      // Calculate credit for foreign tax
      // The credit cannot exceed the domestic tax on the foreign income
      const foreignTaxCredit = Math.min(foreignTaxPaid, domesticTaxOnForeignIncome);
      
      setTaxResult({
        foreignIncome,
        foreignTaxPaid,
        foreignTaxRate: foreignTaxCalculationMethod === 'rate' ? parseFloat(formData.foreignTaxRate) : (foreignTaxPaid / foreignIncome * 100),
        domesticTaxRate: parseFloat(formData.domesticTaxRate),
        domesticTaxOnForeignIncome,
        foreignTaxCredit,
        additionalTaxDue: Math.max(0, domesticTaxOnForeignIncome - foreignTaxPaid)
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 24</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan Kredit Pajak Luar Negeri</h2>
        
        <Alert
          type="info"
          message="PPh Pasal 24 adalah kredit pajak yang diberikan atas penghasilan dari luar negeri yang telah dikenakan pajak di negara tersebut."
          className="mb-6"
        />
        
        <form onSubmit={calculateTax}>
          <CurrencyInput
            id="foreignIncome"
            label="Penghasilan Luar Negeri"
            value={formData.foreignIncome}
            onChange={(value) => handleInputChange('foreignIncome', value)}
            placeholder="0"
            required={true}
            error={!!error && error.includes('penghasilan')}
            helperText={error && error.includes('penghasilan') ? error : "Masukkan jumlah penghasilan dari luar negeri dalam Rupiah"}
          />
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Metode Perhitungan Pajak Luar Negeri</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="taxRate"
                  name="foreignTaxCalculationMethod"
                  value="rate"
                  checked={foreignTaxCalculationMethod === 'rate'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="taxRate" className="ml-2 text-sm text-gray-700">
                  Menggunakan Tarif Pajak Luar Negeri
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="taxAmount"
                  name="foreignTaxCalculationMethod"
                  value="amount"
                  checked={foreignTaxCalculationMethod === 'amount'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="taxAmount" className="ml-2 text-sm text-gray-700">
                  Menggunakan Jumlah Pajak yang Dibayar
                </label>
              </div>
            </div>
          </div>
          
          {foreignTaxCalculationMethod === 'rate' ? (
            <PercentageInput
              id="foreignTaxRate"
              label="Tarif Pajak Luar Negeri"
              value={formData.foreignTaxRate}
              onChange={(value) => handleInputChange('foreignTaxRate', value)}
              placeholder="0"
              required={true}
              error={!!error && error.includes('tarif pajak luar negeri')}
              helperText={error && error.includes('tarif pajak luar negeri') ? error : "Masukkan tarif pajak di negara sumber penghasilan"}
            />
          ) : (
            <CurrencyInput
              id="foreignTaxPaid"
              label="Pajak yang Dibayar di Luar Negeri"
              value={formData.foreignTaxPaid}
              onChange={(value) => handleInputChange('foreignTaxPaid', value)}
              placeholder="0"
              required={true}
              error={!!error && error.includes('pajak yang dibayar')}
              helperText={error && error.includes('pajak yang dibayar') ? error : "Masukkan jumlah pajak yang telah dibayar di luar negeri dalam Rupiah"}
            />
          )}
          
          <PercentageInput
            id="domesticTaxRate"
            label="Tarif Pajak Badan dalam Negeri"
            value={formData.domesticTaxRate}
            onChange={(value) => handleInputChange('domesticTaxRate', value)}
            placeholder="22"
            required={true}
            error={!!error && error.includes('tarif pajak dalam negeri')}
            helperText={error && error.includes('tarif pajak dalam negeri') ? error : "Tarif PPh Badan di Indonesia (standar 22%)"}
          />
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.foreignIncome || (foreignTaxCalculationMethod === 'rate' && !formData.foreignTaxRate) || (foreignTaxCalculationMethod === 'amount' && !formData.foreignTaxPaid)}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung Kredit Pajak Luar Negeri'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan Kredit Pajak Luar Negeri</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Penghasilan dari Luar Negeri</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.foreignIncome)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Tarif Pajak di Luar Negeri</p>
              <p className="text-lg font-semibold">{taxResult.foreignTaxRate.toFixed(2)}%</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Pajak yang Dibayar di Luar Negeri</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.foreignTaxPaid)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Tarif Pajak Badan di Indonesia</p>
              <p className="text-lg font-semibold">{taxResult.domesticTaxRate}%</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Pajak yang Dihitung di Indonesia atas Penghasilan Luar Negeri</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.domesticTaxOnForeignIncome)}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">Kredit Pajak yang Dapat Diperhitungkan (PPh Pasal 24)</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.foreignTaxCredit)}</p>
          </div>
          
          {taxResult.additionalTaxDue > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-gray-700 mb-1">Pajak yang Masih Harus Dibayar</p>
              <p className="text-lg font-semibold text-yellow-700">{formatCurrency(taxResult.additionalTaxDue)}</p>
              <p className="text-sm text-gray-600 mt-1">
                (Pajak di Indonesia lebih besar dari pajak yang dibayar di luar negeri)
              </p>
            </div>
          )}
          
          <Alert 
            type="info"
            title="Catatan Penting"
            message={
              <>
                <p>Kredit pajak maksimal yang dapat diperhitungkan adalah sebesar pajak yang terutang di Indonesia atas penghasilan luar negeri tersebut.</p>
                <p className="mt-2">Untuk menghindari pemajakan berganda, pastikan negara sumber penghasilan memiliki Persetujuan Penghindaran Pajak Berganda (P3B/Tax Treaty) dengan Indonesia.</p>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal24Page;
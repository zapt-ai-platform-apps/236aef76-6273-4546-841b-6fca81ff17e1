import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import Alert from '@/components/common/Alert';

const PPHPasal25Page = () => {
  const [formData, setFormData] = useState({
    previousYearIncome: '',
    previousYearTax: '',
    previousMonthsTax: ''
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTax = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');

    try {
      // Parse input values
      const previousYearIncome = parseFloat(formData.previousYearIncome.replace(/\./g, '').replace(',', '.'));
      const previousYearTax = parseFloat(formData.previousYearTax.replace(/\./g, '').replace(',', '.'));
      const previousMonthsTax = parseFloat(formData.previousMonthsTax.replace(/\./g, '').replace(',', '.') || '0');
      
      if (isNaN(previousYearIncome)) {
        throw new Error('Mohon masukkan nilai penghasilan tahun lalu yang valid');
      }
      
      if (isNaN(previousYearTax)) {
        throw new Error('Mohon masukkan nilai PPh terutang tahun lalu yang valid');
      }
      
      // Calculate effective tax rate
      const effectiveTaxRate = previousYearTax / previousYearIncome;
      
      // Calculate estimated income for current year (using previous year as a base)
      const estimatedAnnualIncome = previousYearIncome;
      
      // Calculate estimated annual tax based on effective tax rate
      const estimatedAnnualTax = estimatedAnnualIncome * effectiveTaxRate;
      
      // Calculate monthly installment
      const monthlyInstallment = (estimatedAnnualTax - previousMonthsTax) / 12;
      
      setTaxResult({
        previousYearIncome,
        previousYearTax,
        effectiveTaxRate: effectiveTaxRate * 100,
        estimatedAnnualIncome,
        estimatedAnnualTax,
        previousMonthsTax,
        monthlyInstallment: Math.max(0, monthlyInstallment) // Ensure we don't get negative values
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 25</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan Angsuran PPh Pasal 25</h2>
        
        <Alert
          type="info"
          message="PPh Pasal 25 adalah angsuran Pajak Penghasilan yang harus dibayar sendiri oleh Wajib Pajak untuk setiap bulan dalam tahun pajak berjalan."
          className="mb-6"
        />
        
        <form onSubmit={calculateTax}>
          <CurrencyInput
            id="previousYearIncome"
            label="Penghasilan Kena Pajak Tahun Lalu"
            value={formData.previousYearIncome}
            onChange={(value) => handleInputChange('previousYearIncome', value)}
            placeholder="0"
            required={true}
            helperText="Penghasilan kena pajak yang dilaporkan di SPT Tahunan tahun lalu"
          />
          
          <CurrencyInput
            id="previousYearTax"
            label="PPh Terutang Tahun Lalu"
            value={formData.previousYearTax}
            onChange={(value) => handleInputChange('previousYearTax', value)}
            placeholder="0"
            required={true}
            helperText="PPh yang terutang berdasarkan SPT Tahunan tahun lalu"
          />
          
          <CurrencyInput
            id="previousMonthsTax"
            label="Pajak yang Sudah Dipotong/Dipungut Pihak Lain"
            value={formData.previousMonthsTax}
            onChange={(value) => handleInputChange('previousMonthsTax', value)}
            placeholder="0"
            required={false}
            helperText="Jika ada kredit pajak yang sudah dipotong/dipungut pihak lain (PPh 21, 22, 23, dll)"
          />
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.previousYearIncome || !formData.previousYearTax}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung Angsuran PPh Pasal 25'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan Angsuran PPh Pasal 25</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Penghasilan Kena Pajak Tahun Lalu</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.previousYearIncome)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">PPh Terutang Tahun Lalu</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.previousYearTax)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Tarif Pajak Efektif</p>
              <p className="text-lg font-semibold">{taxResult.effectiveTaxRate.toFixed(2)}%</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Estimasi Penghasilan Kena Pajak Tahun Ini</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.estimatedAnnualIncome)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Estimasi PPh Terutang Tahun Ini</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.estimatedAnnualTax)}</p>
            </div>
            
            {taxResult.previousMonthsTax > 0 && (
              <div>
                <p className="text-gray-600 mb-1">Kredit Pajak yang Sudah Dipotong/Dipungut</p>
                <p className="text-lg font-semibold">{formatCurrency(taxResult.previousMonthsTax)}</p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">Angsuran PPh Pasal 25 per Bulan</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.monthlyInstallment)}</p>
          </div>
          
          <Alert 
            type="info"
            title="Informasi Penting"
            message={
              <>
                <p>Angsuran PPh Pasal 25 harus dibayarkan paling lambat tanggal 15 bulan berikutnya.</p>
                <p className="mt-2">Jika terjadi perubahan keadaan usaha atau kegiatan Wajib Pajak, Wajib Pajak dapat mengajukan permohonan pengurangan besarnya angsuran PPh Pasal 25.</p>
              </>
            }
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal25Page;
import React, { useState } from 'react';
import CurrencyInput from '@/components/common/CurrencyInput';
import Alert from '@/components/common/Alert';

const PPHPasal21Page = () => {
  const [formData, setFormData] = useState({
    grossIncome: '',
    isJKK: false,
    isJKM: false,
    isJHT: false,
    isJP: false,
    isBPJSKes: false,
    isPTKP: false,
    ptkpStatus: 'TK/0',
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const PTKPValues = {
    'TK/0': 54000000, // Tidak Kawin, 0 tanggungan
    'TK/1': 58500000, // Tidak Kawin, 1 tanggungan
    'TK/2': 63000000, // Tidak Kawin, 2 tanggungan
    'TK/3': 67500000, // Tidak Kawin, 3 tanggungan
    'K/0': 58500000,  // Kawin, 0 tanggungan
    'K/1': 63000000,  // Kawin, 1 tanggungan
    'K/2': 67500000,  // Kawin, 2 tanggungan
    'K/3': 72000000,  // Kawin, 3 tanggungan
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
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
      // Parse gross income
      const grossIncome = parseFloat(formData.grossIncome.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(grossIncome)) {
        throw new Error('Mohon masukkan nilai penghasilan yang valid');
      }

      // Calculate deductions
      let totalDeduction = 0;
      let deductions = {};

      // JKK (Work Accident Insurance) - 0.24% of gross income
      if (formData.isJKK) {
        deductions.jkk = grossIncome * 0.0024;
        totalDeduction += deductions.jkk;
      }

      // JKM (Death Insurance) - 0.3% of gross income
      if (formData.isJKM) {
        deductions.jkm = grossIncome * 0.003;
        totalDeduction += deductions.jkm;
      }

      // JHT (Old Age Insurance) - 2% of gross income
      if (formData.isJHT) {
        deductions.jht = grossIncome * 0.02;
        totalDeduction += deductions.jht;
      }

      // JP (Pension Insurance) - 1% of gross income (max income for calculation is 8,939,700)
      if (formData.isJP) {
        const maxJPIncome = 8939700;
        const incomeForJP = Math.min(grossIncome, maxJPIncome);
        deductions.jp = incomeForJP * 0.01;
        totalDeduction += deductions.jp;
      }

      // BPJS Kesehatan (Health Insurance) - 1% of gross income
      if (formData.isBPJSKes) {
        deductions.bpjsKes = grossIncome * 0.01;
        totalDeduction += deductions.bpjsKes;
      }

      // Calculate net income
      const netIncome = grossIncome - totalDeduction;
      
      // Annualize net income
      const annualNetIncome = netIncome * 12;
      
      // Calculate taxable income (PKP)
      let taxableIncome = 0;
      let ptkpValue = 0;
      
      if (formData.isPTKP) {
        ptkpValue = PTKPValues[formData.ptkpStatus];
        taxableIncome = Math.max(0, annualNetIncome - ptkpValue);
      } else {
        taxableIncome = annualNetIncome;
      }
      
      // Calculate PPh21 (Indonesian Income Tax for Individuals)
      let taxAmount = 0;
      
      if (taxableIncome <= 60000000) {
        taxAmount = taxableIncome * 0.05;
      } else if (taxableIncome <= 250000000) {
        taxAmount = 60000000 * 0.05 + (taxableIncome - 60000000) * 0.15;
      } else if (taxableIncome <= 500000000) {
        taxAmount = 60000000 * 0.05 + 190000000 * 0.15 + (taxableIncome - 250000000) * 0.25;
      } else if (taxableIncome <= 5000000000) {
        taxAmount = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + (taxableIncome - 500000000) * 0.30;
      } else {
        taxAmount = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + 4500000000 * 0.30 + (taxableIncome - 5000000000) * 0.35;
      }
      
      // Monthly tax amount
      const monthlyTaxAmount = taxAmount / 12;
      
      setTaxResult({
        grossIncome,
        deductions,
        totalDeduction,
        netIncome,
        annualNetIncome,
        ptkpValue,
        taxableIncome,
        annualTaxAmount: taxAmount,
        monthlyTaxAmount
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
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Pasal 21</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Perhitungan PPh Pasal 21 Karyawan</h2>
        
        <form onSubmit={calculateTax}>
          <CurrencyInput
            id="grossIncome"
            label="Penghasilan Bruto Sebulan"
            value={formData.grossIncome}
            onChange={(value) => handleInputChange('grossIncome', value)}
            placeholder="0"
            required={true}
            error={!!error}
            helperText={error}
          />
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Potongan Penghasilan</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isJKK"
                  name="isJKK"
                  checked={formData.isJKK}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isJKK" className="ml-2 text-sm text-gray-700">
                  JKK - Jaminan Kecelakaan Kerja (0,24%)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isJKM"
                  name="isJKM"
                  checked={formData.isJKM}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isJKM" className="ml-2 text-sm text-gray-700">
                  JKM - Jaminan Kematian (0,3%)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isJHT"
                  name="isJHT"
                  checked={formData.isJHT}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isJHT" className="ml-2 text-sm text-gray-700">
                  JHT - Jaminan Hari Tua (2%)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isJP"
                  name="isJP"
                  checked={formData.isJP}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isJP" className="ml-2 text-sm text-gray-700">
                  JP - Jaminan Pensiun (1%, maks. penghasilan Rp8.939.700)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isBPJSKes"
                  name="isBPJSKes"
                  checked={formData.isBPJSKes}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isBPJSKes" className="ml-2 text-sm text-gray-700">
                  BPJS Kesehatan (1%)
                </label>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="isPTKP"
                name="isPTKP"
                checked={formData.isPTKP}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPTKP" className="ml-2 text-sm font-medium text-gray-700">
                Gunakan PTKP (Penghasilan Tidak Kena Pajak)
              </label>
            </div>
            
            {formData.isPTKP && (
              <div className="mt-2">
                <label htmlFor="ptkpStatus" className="block text-sm text-gray-700 mb-1">
                  Status PTKP
                </label>
                <select
                  id="ptkpStatus"
                  name="ptkpStatus"
                  value={formData.ptkpStatus}
                  onChange={handleSelectChange}
                  className="select"
                >
                  <option value="TK/0">TK/0 - Tidak Kawin, Tanpa Tanggungan (Rp54.000.000/tahun)</option>
                  <option value="TK/1">TK/1 - Tidak Kawin, 1 Tanggungan (Rp58.500.000/tahun)</option>
                  <option value="TK/2">TK/2 - Tidak Kawin, 2 Tanggungan (Rp63.000.000/tahun)</option>
                  <option value="TK/3">TK/3 - Tidak Kawin, 3 Tanggungan (Rp67.500.000/tahun)</option>
                  <option value="K/0">K/0 - Kawin, Tanpa Tanggungan (Rp58.500.000/tahun)</option>
                  <option value="K/1">K/1 - Kawin, 1 Tanggungan (Rp63.000.000/tahun)</option>
                  <option value="K/2">K/2 - Kawin, 2 Tanggungan (Rp67.500.000/tahun)</option>
                  <option value="K/3">K/3 - Kawin, 3 Tanggungan (Rp72.000.000/tahun)</option>
                </select>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !formData.grossIncome}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPh Pasal 21'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPh Pasal 21</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Penghasilan Bruto</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.grossIncome)}/bulan</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Total Potongan</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.totalDeduction)}/bulan</p>
              
              {Object.entries(taxResult.deductions).length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  <p className="font-medium mb-1">Rincian Potongan:</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    {formData.isJKK && (
                      <li>JKK: {formatCurrency(taxResult.deductions.jkk)}</li>
                    )}
                    {formData.isJKM && (
                      <li>JKM: {formatCurrency(taxResult.deductions.jkm)}</li>
                    )}
                    {formData.isJHT && (
                      <li>JHT: {formatCurrency(taxResult.deductions.jht)}</li>
                    )}
                    {formData.isJP && (
                      <li>JP: {formatCurrency(taxResult.deductions.jp)}</li>
                    )}
                    {formData.isBPJSKes && (
                      <li>BPJS Kesehatan: {formatCurrency(taxResult.deductions.bpjsKes)}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Penghasilan Neto</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.netIncome)}/bulan</p>
              <p className="text-sm text-gray-500">({formatCurrency(taxResult.annualNetIncome)}/tahun)</p>
            </div>
            
            {formData.isPTKP && (
              <div>
                <p className="text-gray-600 mb-1">PTKP ({formData.ptkpStatus})</p>
                <p className="text-lg font-semibold">{formatCurrency(taxResult.ptkpValue)}/tahun</p>
              </div>
            )}
            
            <div>
              <p className="text-gray-600 mb-1">Penghasilan Kena Pajak (PKP)</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.taxableIncome)}/tahun</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-1">PPh Pasal 21 yang Harus Dipotong</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.monthlyTaxAmount)}/bulan</p>
            <p className="text-sm text-gray-600">({formatCurrency(taxResult.annualTaxAmount)}/tahun)</p>
          </div>
          
          <Alert 
            type="info"
            title="Catatan"
            message="Hasil perhitungan ini merupakan estimasi. Untuk perhitungan yang akurat, konsultasikan dengan konsultan pajak atau periksa aturan terbaru dari Direktorat Jenderal Pajak."
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default PPHPasal21Page;
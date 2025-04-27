import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPNForm() {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [includesTax, setIncludesTax] = useState(false);
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Current PPN rate (11%)
  const TAX_RATE = 0.11;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const amount = parseFloat(transactionAmount.replace(/\./g, '').replace(',', '.'));
      let baseAmount, taxAmount;
      
      if (includesTax) {
        // If amount includes tax
        baseAmount = amount / (1 + TAX_RATE);
        taxAmount = amount - baseAmount;
      } else {
        // If amount doesn't include tax
        baseAmount = amount;
        taxAmount = amount * TAX_RATE;
      }
      
      setTaxResult({
        type: 'PPN (11%)',
        baseAmount: baseAmount,
        taxRate: TAX_RATE,
        taxAmount: taxAmount,
        totalAmount: baseAmount + taxAmount,
        includesTax: includesTax
      });
      
      setLoading(false);
    }, 500);
  };
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters except dots
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Format the number with thousands separator
    const formattedValue = new Intl.NumberFormat('id-ID').format(
      numericValue.replace(/\./g, '')
    );
    
    setTransactionAmount(formattedValue);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Hitung PPN (11%)</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Pajak Pertambahan Nilai (PPN) adalah pajak yang dikenakan atas konsumsi barang dan jasa kena pajak di dalam wilayah Indonesia.
          CV dengan omzet melebihi Rp4,8 miliar per tahun wajib dikukuhkan sebagai Pengusaha Kena Pajak (PKP) dan memungut PPN.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="transactionAmount" className="label">
            Nilai Transaksi
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">Rp</span>
            </div>
            <input
              type="text"
              id="transactionAmount"
              value={transactionAmount}
              onChange={handleAmountChange}
              className="input-field pl-10"
              placeholder="0"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="includesTax"
              type="checkbox"
              checked={includesTax}
              onChange={(e) => setIncludesTax(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="includesTax" className="ml-2 block text-sm text-gray-700">
              Nilai sudah termasuk PPN
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Pilih opsi ini jika nilai transaksi yang dimasukkan sudah termasuk PPN.
          </p>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Menghitung...' : 'Hitung PPN'}
        </button>
      </form>
      
      {taxResult && (
        <TaxResult
          result={taxResult}
          calculationDate={new Date()}
          showTotalAmount={true}
        />
      )}
    </div>
  );
}
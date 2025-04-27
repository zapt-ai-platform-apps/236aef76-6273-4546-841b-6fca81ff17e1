import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPH4Form() {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('propertyRental');
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const taxRates = {
    propertyRental: 0.10, // 10%
    propertySale: 0.025, // 2.5%
    constructionServices: 0.02, // 2-4%, using 2% for simplicity
    sharia: 0.0025, // 0.25%
    lottery: 0.25, // 25%
    interestDeposit: 0.2, // 20%
  };
  
  const taxTypeLabels = {
    propertyRental: 'Sewa Tanah dan/atau Bangunan',
    propertySale: 'Jual Beli Tanah dan/atau Bangunan',
    constructionServices: 'Jasa Konstruksi',
    sharia: 'Transaksi Syariah',
    lottery: 'Hadiah Undian',
    interestDeposit: 'Bunga Deposito',
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const amount = parseFloat(transactionAmount.replace(/\./g, '').replace(',', '.'));
      const taxRate = taxRates[transactionType];
      const taxAmount = amount * taxRate;
      
      setTaxResult({
        type: `PPh Pasal 4 ayat (2) - ${taxTypeLabels[transactionType]}`,
        baseAmount: amount,
        taxRate: taxRate,
        taxAmount: taxAmount,
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
      <h2 className="text-lg font-medium mb-4">Hitung PPh Pasal 4 ayat (2)</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          PPh Pasal 4 ayat (2) adalah pajak yang dikenakan atas penghasilan tertentu yang dikenai pajak bersifat final,
          seperti sewa tanah/bangunan, jual beli properti, jasa konstruksi, dan lainnya.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="transactionType" className="label">
            Jenis Transaksi
          </label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="input-field"
            required
          >
            <option value="propertyRental">Sewa Tanah dan/atau Bangunan (10%)</option>
            <option value="propertySale">Jual Beli Tanah dan/atau Bangunan (2,5%)</option>
            <option value="constructionServices">Jasa Konstruksi (2%)</option>
            <option value="sharia">Transaksi Syariah (0,25%)</option>
            <option value="lottery">Hadiah Undian (25%)</option>
            <option value="interestDeposit">Bunga Deposito (20%)</option>
          </select>
        </div>
        
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
        
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Menghitung...' : 'Hitung Pajak'}
        </button>
      </form>
      
      {taxResult && (
        <TaxResult
          result={taxResult}
          calculationDate={new Date()}
        />
      )}
    </div>
  );
}
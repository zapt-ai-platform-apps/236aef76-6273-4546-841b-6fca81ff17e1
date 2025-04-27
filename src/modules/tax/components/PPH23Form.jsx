import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPH23Form() {
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('services');
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const taxRates = {
    services: 0.02, // 2%
    rent: 0.02, // 2%
    prize: 0.15, // 15%
    royalty: 0.15, // 15%
    technical: 0.02, // 2%
  };
  
  const taxTypeLabels = {
    services: 'Jasa',
    rent: 'Sewa (selain tanah dan bangunan)',
    prize: 'Hadiah',
    royalty: 'Royalti',
    technical: 'Jasa Teknik',
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
        type: `PPh Pasal 23 - ${taxTypeLabels[transactionType]}`,
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
      <h2 className="text-lg font-medium mb-4">Hitung PPh Pasal 23</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          PPh Pasal 23 adalah pajak yang dikenakan atas penghasilan yang diterima oleh pihak dalam negeri
          yang berasal dari modal, penyerahan jasa, atau penyelenggaraan kegiatan selain yang telah dipotong PPh Pasal 21.
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
            <option value="services">Jasa (2%)</option>
            <option value="rent">Sewa selain tanah dan bangunan (2%)</option>
            <option value="prize">Hadiah dan penghargaan (15%)</option>
            <option value="royalty">Royalti (15%)</option>
            <option value="technical">Jasa teknik (2%)</option>
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
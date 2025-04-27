import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPHFinalForm() {
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastCalculationDate, setLastCalculationDate] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const revenue = parseFloat(monthlyRevenue.replace(/\./g, '').replace(',', '.'));
      const taxAmount = revenue * 0.003; // 0.3%
      
      setTaxResult({
        type: 'PPh Final UMKM (0.3%)',
        baseAmount: revenue,
        taxRate: 0.003,
        taxAmount: taxAmount,
      });
      
      setLastCalculationDate(new Date());
      setLoading(false);
    }, 500);
  };
  
  const handleRevenueChange = (e) => {
    const value = e.target.value;
    // Remove all non-numeric characters except dots
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Format the number with thousands separator
    const formattedValue = new Intl.NumberFormat('id-ID').format(
      numericValue.replace(/\./g, '')
    );
    
    setMonthlyRevenue(formattedValue);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Hitung PPh Final UMKM (0.3%)</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Berdasarkan PP No. 55 Tahun 2022, CV yang memenuhi kriteria sebagai UKM dengan omzet sampai dengan Rp4,8 miliar per tahun
          dapat menggunakan tarif PPh Final sebesar 0,3% dari omzet bruto.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-blue-700">
          <p className="font-medium">Catatan Penting:</p>
          <p>Tarif PPh Final 0,3% hanya dapat digunakan selama maksimal 4 tahun.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="monthlyRevenue" className="label">
            Pendapatan Bulanan (Omzet)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">Rp</span>
            </div>
            <input
              type="text"
              id="monthlyRevenue"
              value={monthlyRevenue}
              onChange={handleRevenueChange}
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
          calculationDate={lastCalculationDate}
        />
      )}
    </div>
  );
}
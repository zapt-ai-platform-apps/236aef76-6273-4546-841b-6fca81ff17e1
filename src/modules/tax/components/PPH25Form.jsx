import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPH25Form() {
  const [previousYearTax, setPreviousYearTax] = useState('');
  const [monthsCount, setMonthsCount] = useState(12);
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const taxAmount = parseFloat(previousYearTax.replace(/\./g, '').replace(',', '.'));
      const monthlyInstallment = taxAmount / monthsCount;
      
      setTaxResult({
        type: 'PPh Pasal 25',
        baseAmount: taxAmount,
        taxRate: `1/${monthsCount} per bulan`,
        taxAmount: monthlyInstallment,
        annualAmount: taxAmount,
        installmentPeriod: monthsCount
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
    
    setPreviousYearTax(formattedValue);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Hitung PPh Pasal 25</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          PPh Pasal 25 adalah angsuran pajak penghasilan yang harus dibayar sendiri oleh wajib pajak
          untuk setiap bulan dalam tahun pajak berjalan. Besarnya angsuran pajak dihitung berdasarkan
          pajak penghasilan tahun pajak sebelumnya.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-3 text-sm text-blue-700">
          <p>
            CV yang telah melewati masa penggunaan PPh Final akan kembali menggunakan tarif PPh Badan normal,
            dan melakukan pembayaran angsuran PPh Pasal 25.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="previousYearTax" className="label">
            PPh Terutang Tahun Sebelumnya
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">Rp</span>
            </div>
            <input
              type="text"
              id="previousYearTax"
              value={previousYearTax}
              onChange={handleAmountChange}
              className="input-field pl-10"
              placeholder="0"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="monthsCount" className="label">
            Jumlah Bulan Angsuran
          </label>
          <select
            id="monthsCount"
            value={monthsCount}
            onChange={(e) => setMonthsCount(parseInt(e.target.value, 10))}
            className="input-field"
          >
            <option value="12">12 bulan (Januari - Desember)</option>
            <option value="6">6 bulan (Juli - Desember)</option>
            <option value="4">4 bulan (September - Desember)</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full sm:w-auto cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Menghitung...' : 'Hitung Angsuran'}
        </button>
      </form>
      
      {taxResult && (
        <TaxResult
          result={taxResult}
          calculationDate={new Date()}
          showInstallmentDetails={true}
        />
      )}
    </div>
  );
}
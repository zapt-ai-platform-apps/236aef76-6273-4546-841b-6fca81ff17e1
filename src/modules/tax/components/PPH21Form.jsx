import React, { useState } from 'react';
import TaxResult from './TaxResult';

export default function PPH21Form() {
  const [employeeSalary, setEmployeeSalary] = useState('');
  const [hasNPWP, setHasNPWP] = useState(true);
  const [allowances, setAllowances] = useState('');
  const [taxResult, setTaxResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const salary = parseFloat(employeeSalary.replace(/\./g, '').replace(',', '.'));
      const allowanceAmount = allowances ? parseFloat(allowances.replace(/\./g, '').replace(',', '.')) : 0;
      
      // Basic calculation (simplified)
      const grossIncome = salary + allowanceAmount;
      const taxableIncome = grossIncome * 0.5; // Simplified calculation
      
      // Simplified PPh 21 calculation (this should be more complex in real implementation)
      let taxRate = 0.05; // 5% for first bracket
      if (taxableIncome > 50000000) {
        taxRate = 0.15; // 15% for second bracket
      }
      
      // Apply higher rate for those without NPWP
      if (!hasNPWP) {
        taxRate = taxRate * 1.2; // 20% higher
      }
      
      const taxAmount = taxableIncome * taxRate;
      
      setTaxResult({
        type: 'PPh Pasal 21',
        baseAmount: grossIncome,
        taxableIncome: taxableIncome,
        taxRate: taxRate,
        taxAmount: taxAmount,
        withNPWP: hasNPWP
      });
      
      setLoading(false);
    }, 500);
  };
  
  const handleCurrencyChange = (e, setter) => {
    const value = e.target.value;
    // Remove all non-numeric characters except dots
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Format the number with thousands separator
    const formattedValue = new Intl.NumberFormat('id-ID').format(
      numericValue.replace(/\./g, '')
    );
    
    setter(formattedValue);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Hitung PPh Pasal 21</h2>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          PPh Pasal 21 adalah pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain
          yang diterima oleh orang pribadi subjek pajak dalam negeri.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="employeeSalary" className="label">
            Gaji Pokok Karyawan (Bulanan)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">Rp</span>
            </div>
            <input
              type="text"
              id="employeeSalary"
              value={employeeSalary}
              onChange={(e) => handleCurrencyChange(e, setEmployeeSalary)}
              className="input-field pl-10"
              placeholder="0"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="allowances" className="label">
            Tunjangan dan Bonus (Bulanan)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">Rp</span>
            </div>
            <input
              type="text"
              id="allowances"
              value={allowances}
              onChange={(e) => handleCurrencyChange(e, setAllowances)}
              className="input-field pl-10"
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="hasNPWP"
              type="checkbox"
              checked={hasNPWP}
              onChange={(e) => setHasNPWP(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasNPWP" className="ml-2 block text-sm text-gray-700">
              Karyawan memiliki NPWP
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Jika tidak memiliki NPWP, tarif pajak akan lebih tinggi 20% dari tarif normal.
          </p>
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
          showTaxableIncome={true}
        />
      )}
    </div>
  );
}
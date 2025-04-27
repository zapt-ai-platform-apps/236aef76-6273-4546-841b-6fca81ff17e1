import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle21Calculator() {
  const [salary, setSalary] = useState('');
  const [allowances, setAllowances] = useState('');
  const [otherIncome, setOtherIncome] = useState('');
  const [employeeCount, setEmployeeCount] = useState('1');
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!salary) newErrors.salary = 'Gaji pokok harus diisi';
    if (!employeeCount || parseInt(employeeCount) < 1) newErrors.employeeCount = 'Jumlah karyawan harus minimal 1';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call or processing
    setTimeout(() => {
      setIsCalculated(true);
      setLoading(false);
    }, 500);
  };
  
  // Simple calculation for PPh 21
  const calculatePPh21 = () => {
    // Convert string inputs to numbers
    const monthlySalary = parseFloat(salary) || 0;
    const monthlyAllowances = parseFloat(allowances) || 0;
    const monthlyOtherIncome = parseFloat(otherIncome) || 0;
    const employees = parseInt(employeeCount) || 1;
    
    // Calculate gross income
    const grossMonthlyIncome = monthlySalary + monthlyAllowances + monthlyOtherIncome;
    const annualIncome = grossMonthlyIncome * 12;
    
    // For simplicity, using approximate calculation
    // In a real app, this would consider personal exemptions, dependents, etc.
    let taxRate = 0.05; // 5% for basic calculation
    
    if (annualIncome > 50000000) {
      taxRate = 0.15; // 15% for income > 50 million
    }
    if (annualIncome > 250000000) {
      taxRate = 0.25; // 25% for income > 250 million
    }
    
    const monthlyTaxPerEmployee = grossMonthlyIncome * taxRate;
    const totalMonthlyTax = monthlyTaxPerEmployee * employees;
    
    return {
      taxRate,
      monthlyTaxPerEmployee,
      totalMonthlyTax,
      annualTax: totalMonthlyTax * 12
    };
  };
  
  const taxResult = calculatePPh21();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 21" 
        subtitle="Hitung pajak penghasilan untuk karyawan CV Anda"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh 21</h2>
            
            <form onSubmit={handleCalculate}>
              <CurrencyInput
                id="salary"
                label="Gaji Pokok Bulanan"
                value={salary}
                onChange={setSalary}
                placeholder="Masukkan gaji pokok"
                required
                error={errors.salary}
              />
              
              <CurrencyInput
                id="allowances"
                label="Tunjangan Bulanan"
                value={allowances}
                onChange={setAllowances}
                placeholder="Masukkan jumlah tunjangan"
              />
              
              <CurrencyInput
                id="otherIncome"
                label="Penghasilan Lainnya Bulanan"
                value={otherIncome}
                onChange={setOtherIncome}
                placeholder="Masukkan penghasilan lainnya"
              />
              
              <div className="form-group">
                <label htmlFor="employeeCount" className="block mb-1 text-gray-700 font-medium">
                  Jumlah Karyawan <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="employeeCount"
                  min="1"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  className={`box-border py-2 px-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.employeeCount ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.employeeCount && (
                  <p className="mt-1 text-sm text-red-500">{errors.employeeCount}</p>
                )}
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit" 
                  className="btn-primary cursor-pointer w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menghitung...
                    </span>
                  ) : 'Hitung PPh 21'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 21</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 21 adalah pajak atas penghasilan berupa gaji, upah, honorarium, tunjangan, dan pembayaran lain dengan nama dan dalam bentuk apapun sehubungan dengan pekerjaan atau jabatan, jasa, dan kegiatan yang dilakukan oleh orang pribadi.
              </p>
              <p>
                <span className="font-semibold">Catatan:</span> Perhitungan ini merupakan estimasi sederhana. Perhitungan PPh 21 yang akurat harus mempertimbangkan PTKP, tanggungan, iuran pensiun, dan faktor lainnya.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <>
              <TaxResult
                title="PPh Pasal 21 (Bulanan)"
                amount={taxResult.totalMonthlyTax}
                details={[
                  { label: 'Gaji Pokok', value: `Rp ${new Intl.NumberFormat('id-ID').format(salary)}` },
                  { label: 'Tunjangan', value: `Rp ${new Intl.NumberFormat('id-ID').format(allowances || 0)}` },
                  { label: 'Penghasilan Lain', value: `Rp ${new Intl.NumberFormat('id-ID').format(otherIncome || 0)}` },
                  { label: 'Tarif Pajak', value: `${taxResult.taxRate * 100}%` },
                  { label: 'PPh per Karyawan', value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.monthlyTaxPerEmployee)}` },
                  { label: 'Jumlah Karyawan', value: employeeCount },
                ]}
                note="PPh Pasal 21 harus disetor paling lambat tanggal 10 bulan berikutnya."
              />
              
              <div className="card mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">PPh Pasal 21 Tahunan</h3>
                <div className="bg-green-50 p-3 border border-green-200 rounded-md">
                  <p className="font-medium text-green-800">
                    Rp {new Intl.NumberFormat('id-ID').format(taxResult.annualTax)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
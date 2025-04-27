import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle25Calculator() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [deductibleExpenses, setDeductibleExpenses] = useState('');
  const [previousTaxPaid, setPreviousTaxPaid] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!annualIncome) {
      newErrors.annualIncome = 'Penghasilan tahunan harus diisi';
    }
    
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

  // Calculate PPh Article 25
  const calculatePPh25 = () => {
    const income = parseFloat(annualIncome) || 0;
    const expenses = parseFloat(deductibleExpenses) || 0;
    const previousTax = parseFloat(previousTaxPaid) || 0;
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, income - expenses);
    
    // Calculate annual corporate tax
    let annualTax = 0;
    
    // Using 2022 corporate tax rate (22%)
    annualTax = taxableIncome * 0.22;
    
    // Calculate monthly installment (current year's tax minus taxes already paid, divided by 12)
    const remainingTax = Math.max(0, annualTax - previousTax);
    const monthlyInstallment = remainingTax / 12;
    
    return {
      taxableIncome,
      annualTax,
      monthlyInstallment
    };
  };

  const taxResult = calculatePPh25();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 25" 
        subtitle="Hitung angsuran pajak penghasilan bulanan untuk CV"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh 25</h2>
            
            <form onSubmit={handleCalculate}>
              <CurrencyInput
                id="annualIncome"
                label="Estimasi Penghasilan Tahunan"
                value={annualIncome}
                onChange={setAnnualIncome}
                placeholder="Masukkan estimasi penghasilan tahunan"
                required
                error={errors.annualIncome}
              />
              
              <CurrencyInput
                id="deductibleExpenses"
                label="Estimasi Biaya yang Dapat Dikurangkan"
                value={deductibleExpenses}
                onChange={setDeductibleExpenses}
                placeholder="Masukkan estimasi biaya"
              />
              
              <CurrencyInput
                id="previousTaxPaid"
                label="PPh yang Sudah Dibayar Tahun Ini"
                value={previousTaxPaid}
                onChange={setPreviousTaxPaid}
                placeholder="Masukkan PPh yang sudah dibayar"
              />
              
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
                  ) : 'Hitung PPh 25'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 25</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 25 adalah angsuran Pajak Penghasilan yang harus dibayar sendiri oleh Wajib Pajak untuk setiap bulan dalam tahun pajak berjalan.
              </p>
              <p>
                <span className="font-semibold">Perhitungan PPh Pasal 25:</span> Pajak penghasilan terutang berdasarkan SPT Tahunan PPh tahun lalu dikurangi dengan kredit pajak, kemudian dibagi 12.
              </p>
              <p>
                <span className="font-semibold">Tarif PPh Badan (CV):</span> Tarif tunggal sebesar 22% untuk tahun pajak 2022 dan seterusnya.
              </p>
              <p>
                <span className="font-semibold">Batas Waktu Pembayaran:</span> Paling lambat tanggal 15 bulan berikutnya.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <>
              <TaxResult
                title="Angsuran PPh Pasal 25 (Bulanan)"
                amount={taxResult.monthlyInstallment}
                details={[
                  { 
                    label: 'Penghasilan Tahunan', 
                    value: `Rp ${new Intl.NumberFormat('id-ID').format(annualIncome)}` 
                  },
                  { 
                    label: 'Biaya Dikurangkan', 
                    value: `Rp ${new Intl.NumberFormat('id-ID').format(deductibleExpenses || 0)}` 
                  },
                  { 
                    label: 'Penghasilan Kena Pajak', 
                    value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.taxableIncome)}` 
                  },
                  { 
                    label: 'Tarif PPh Badan', 
                    value: '22%' 
                  },
                  { 
                    label: 'PPh Badan Tahunan', 
                    value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.annualTax)}` 
                  },
                  { 
                    label: 'PPh yang Sudah Dibayar', 
                    value: `Rp ${new Intl.NumberFormat('id-ID').format(previousTaxPaid || 0)}` 
                  }
                ]}
                note="Angsuran PPh Pasal 25 dibayar setiap bulan paling lambat tanggal 15 bulan berikutnya."
              />
              
              <div className="card mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">PPh Pasal 25 Tahunan</h3>
                <div className="bg-green-50 p-3 border border-green-200 rounded-md">
                  <p className="font-medium text-green-800">
                    Rp {new Intl.NumberFormat('id-ID').format(taxResult.monthlyInstallment * 12)}
                  </p>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Total angsuran PPh Pasal 25 untuk 12 bulan.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle24Calculator() {
  const [foreignIncome, setForeignIncome] = useState('');
  const [foreignTaxRate, setForeignTaxRate] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!foreignIncome) {
      newErrors.foreignIncome = 'Penghasilan luar negeri harus diisi';
    }
    if (!foreignTaxRate) {
      newErrors.foreignTaxRate = 'Tarif pajak luar negeri harus diisi';
    }
    if (!exchangeRate) {
      newErrors.exchangeRate = 'Nilai tukar harus diisi';
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

  // Calculate PPh Article 24
  const calculatePPh24 = () => {
    const income = parseFloat(foreignIncome) || 0;
    const taxRate = parseFloat(foreignTaxRate) || 0;
    const rate = parseFloat(exchangeRate) || 1;
    
    // Foreign tax paid
    const foreignTaxPaid = income * (taxRate / 100);
    
    // Convert to IDR
    const incomeInIDR = income * rate;
    const foreignTaxInIDR = foreignTaxPaid * rate;
    
    // Calculate Indonesian tax on foreign income
    // Using corporate tax rate (22%)
    const indonesianTax = incomeInIDR * 0.22;
    
    // PPh 24 credit is the lesser of foreign tax paid or Indonesian tax
    const pph24Credit = Math.min(foreignTaxInIDR, indonesianTax);
    
    return {
      income,
      foreignTaxPaid,
      incomeInIDR,
      foreignTaxInIDR,
      indonesianTax,
      pph24Credit
    };
  };

  const taxResult = calculatePPh24();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 24" 
        subtitle="Hitung kredit pajak atas penghasilan dari luar negeri"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh 24</h2>
            
            <form onSubmit={handleCalculate}>
              <CurrencyInput
                id="foreignIncome"
                label="Penghasilan dari Luar Negeri (dalam mata uang asing)"
                value={foreignIncome}
                onChange={setForeignIncome}
                placeholder="Masukkan jumlah penghasilan"
                required
                error={errors.foreignIncome}
              />
              
              <div className="form-group">
                <label htmlFor="foreignTaxRate" className="block mb-1 text-gray-700 font-medium">
                  Tarif Pajak di Negara Sumber (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="foreignTaxRate"
                  min="0"
                  max="100"
                  step="0.01"
                  value={foreignTaxRate}
                  onChange={(e) => setForeignTaxRate(e.target.value)}
                  placeholder="Masukkan tarif pajak (%) di negara sumber"
                  className={`box-border py-2 px-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.foreignTaxRate ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.foreignTaxRate && (
                  <p className="mt-1 text-sm text-red-500">{errors.foreignTaxRate}</p>
                )}
              </div>
              
              <CurrencyInput
                id="exchangeRate"
                label="Nilai Tukar ke Rupiah"
                value={exchangeRate}
                onChange={setExchangeRate}
                placeholder="Masukkan nilai tukar ke Rupiah"
                required
                error={errors.exchangeRate}
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
                  ) : 'Hitung PPh 24'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 24</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 24 adalah kredit pajak yang diberikan atas pajak yang terutang atau yang telah dibayar di luar negeri atas penghasilan yang diterima atau diperoleh oleh Wajib Pajak dalam negeri dari luar negeri.
              </p>
              <p>
                <span className="font-semibold">Tujuan:</span> Untuk menghindari pengenaan pajak berganda atas penghasilan yang sama.
              </p>
              <p>
                <span className="font-semibold">Prinsip Penghitungan:</span> Kredit pajak yang diberikan sebesar pajak yang telah dibayar di luar negeri, tetapi tidak boleh melebihi perhitungan pajak yang terutang di Indonesia berdasarkan UU PPh.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <TaxResult
              title="Kredit Pajak PPh Pasal 24"
              amount={taxResult.pph24Credit}
              details={[
                { 
                  label: 'Penghasilan Luar Negeri', 
                  value: `${new Intl.NumberFormat('en-US').format(taxResult.income)} (mata uang asing)` 
                },
                { 
                  label: 'Tarif Pajak Luar Negeri', 
                  value: `${foreignTaxRate}%` 
                },
                { 
                  label: 'Pajak Dibayar di Luar Negeri', 
                  value: `${new Intl.NumberFormat('en-US').format(taxResult.foreignTaxPaid)} (mata uang asing)` 
                },
                { 
                  label: 'Nilai Tukar', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(exchangeRate)}` 
                },
                { 
                  label: 'Penghasilan dalam IDR', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.incomeInIDR)}` 
                },
                { 
                  label: 'Pajak LN dalam IDR', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.foreignTaxInIDR)}` 
                },
                { 
                  label: 'Pajak Indonesia', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.indonesianTax)} (22%)` 
                }
              ]}
              note="Kredit pajak PPh Pasal 24 adalah sebesar pajak yang dibayar di luar negeri, tetapi tidak boleh melebihi pajak yang terutang di Indonesia."
            />
          )}
        </div>
      </div>
    </div>
  );
}
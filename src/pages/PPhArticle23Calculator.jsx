import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle23Calculator() {
  const [incomeType, setIncomeType] = useState('dividend');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [hasNPWP, setHasNPWP] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!incomeAmount) {
      newErrors.incomeAmount = 'Jumlah penghasilan harus diisi';
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

  // Income type options with their tax rates
  const incomeTypes = [
    { value: 'dividend', label: 'Dividen', rate: 0.15 },
    { value: 'interest', label: 'Bunga', rate: 0.15 },
    { value: 'royalty', label: 'Royalti', rate: 0.15 },
    { value: 'rent', label: 'Sewa (selain tanah dan bangunan)', rate: 0.02 },
    { value: 'services', label: 'Jasa Teknik', rate: 0.02 },
    { value: 'consultation', label: 'Jasa Konsultasi', rate: 0.02 },
    { value: 'management', label: 'Jasa Manajemen', rate: 0.02 },
    { value: 'other', label: 'Jasa Lainnya', rate: 0.02 }
  ];

  // Get the selected income type
  const selectedType = incomeTypes.find(type => type.value === incomeType);

  // Calculate PPh 23
  const calculatePPh23 = () => {
    const amount = parseFloat(incomeAmount) || 0;
    let taxRate = selectedType?.rate || 0.02;
    
    // If no NPWP, tax rate is doubled (2x)
    if (!hasNPWP) {
      taxRate = taxRate * 2;
    }
    
    const taxAmount = amount * taxRate;
    
    return {
      taxRate,
      amount,
      taxAmount
    };
  };

  const taxResult = calculatePPh23();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 23" 
        subtitle="Hitung pajak penghasilan atas dividen, bunga, royalti, dan jasa"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh 23</h2>
            
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label htmlFor="incomeType" className="block mb-1 text-gray-700 font-medium">
                  Jenis Penghasilan <span className="text-red-500">*</span>
                </label>
                <select
                  id="incomeType"
                  value={incomeType}
                  onChange={(e) => setIncomeType(e.target.value)}
                  className="box-border py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {incomeTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.rate * 100}%)
                    </option>
                  ))}
                </select>
              </div>
              
              <CurrencyInput
                id="incomeAmount"
                label="Jumlah Penghasilan"
                value={incomeAmount}
                onChange={setIncomeAmount}
                placeholder="Masukkan jumlah penghasilan"
                required
                error={errors.incomeAmount}
              />
              
              <div className="form-group">
                <label className="block mb-1 text-gray-700 font-medium">
                  Status NPWP
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={hasNPWP}
                      onChange={() => setHasNPWP(true)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Memiliki NPWP</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={!hasNPWP}
                      onChange={() => setHasNPWP(false)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Tidak Memiliki NPWP</span>
                  </label>
                </div>
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
                  ) : 'Hitung PPh 23'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 23</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 23 adalah pajak yang dikenakan atas penghasilan berupa dividen, bunga, royalti, hadiah dan penghargaan, sewa dan penghasilan lain sehubungan dengan penggunaan harta, serta imbalan jasa.
              </p>
              <p>
                <span className="font-semibold">Tarif PPh Pasal 23:</span>
              </p>
              <ul className="list-disc pl-6">
                <li>15% dari jumlah bruto atas dividen, bunga, royalti, dan hadiah/penghargaan</li>
                <li>2% dari jumlah bruto atas sewa (selain tanah/bangunan) dan imbalan jasa</li>
                <li>Tarif menjadi 2 kali lipat bagi wajib pajak yang tidak memiliki NPWP</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <TaxResult
              title="PPh Pasal 23"
              amount={taxResult.taxAmount}
              details={[
                { 
                  label: 'Jenis Penghasilan', 
                  value: selectedType?.label || 'Jasa Lainnya'
                },
                { 
                  label: 'Jumlah Penghasilan', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.amount)}` 
                },
                { 
                  label: 'Tarif Pajak', 
                  value: `${taxResult.taxRate * 100}%` 
                },
                { 
                  label: 'Status NPWP', 
                  value: hasNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP' 
                }
              ]}
              note="PPh Pasal 23 harus disetor paling lambat tanggal 10 bulan berikutnya setelah masa pajak berakhir."
            />
          )}
        </div>
      </div>
    </div>
  );
}
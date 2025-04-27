import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle4Calculator() {
  const [incomeType, setIncomeType] = useState('propertyRental');
  const [incomeAmount, setIncomeAmount] = useState('');
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
    { value: 'propertyRental', label: 'Sewa Tanah dan/atau Bangunan', rate: 0.10 },
    { value: 'propertySale', label: 'Pengalihan Hak atas Tanah dan/atau Bangunan', rate: 0.025 },
    { value: 'construction', label: 'Jasa Konstruksi - Pelaksanaan', rate: 0.03 },
    { value: 'constructionPlanning', label: 'Jasa Konstruksi - Perencanaan', rate: 0.04 },
    { value: 'constructionSupervision', label: 'Jasa Konstruksi - Pengawasan', rate: 0.04 },
    { value: 'bondInterest', label: 'Bunga Obligasi', rate: 0.15 },
    { value: 'deposit', label: 'Bunga Deposito/Tabungan', rate: 0.20 },
    { value: 'lottery', label: 'Hadiah Undian', rate: 0.25 }
  ];

  // Get the selected income type
  const selectedType = incomeTypes.find(type => type.value === incomeType);

  // Calculate PPh Pasal 4 ayat (2)
  const calculatePPh4 = () => {
    const amount = parseFloat(incomeAmount) || 0;
    const taxRate = selectedType?.rate || 0.10;
    const taxAmount = amount * taxRate;
    
    return {
      taxRate,
      amount,
      taxAmount
    };
  };

  const taxResult = calculatePPh4();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 4 ayat (2)" 
        subtitle="Hitung pajak penghasilan final atas sewa, penjualan properti, dan penghasilan tertentu lainnya"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh Pasal 4 ayat (2)</h2>
            
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
                  ) : 'Hitung PPh Pasal 4(2)'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 4 ayat (2)</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 4 ayat (2) adalah pajak penghasilan yang bersifat final, yaitu pajak yang telah dilunasi, tidak diperhitungkan lagi dalam SPT Tahunan. Pajak ini umumnya dikenakan atas jenis penghasilan tertentu.
              </p>
              <p>
                <span className="font-semibold">Tarif PPh Pasal 4 ayat (2):</span>
              </p>
              <ul className="list-disc pl-6">
                <li>10% dari jumlah bruto atas sewa tanah dan/atau bangunan</li>
                <li>2,5% dari jumlah bruto nilai pengalihan hak atas tanah dan/atau bangunan</li>
                <li>Jasa konstruksi: 2-6% tergantung jenis jasa dan kualifikasi pelaksana</li>
                <li>15-20% dari bunga deposito, tabungan, dan obligasi</li>
                <li>25% dari hadiah undian</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <TaxResult
              title="PPh Pasal 4 ayat (2)"
              amount={taxResult.taxAmount}
              details={[
                { 
                  label: 'Jenis Penghasilan', 
                  value: selectedType?.label
                },
                { 
                  label: 'Jumlah Penghasilan', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.amount)}` 
                },
                { 
                  label: 'Tarif Pajak', 
                  value: `${taxResult.taxRate * 100}%` 
                }
              ]}
              note="PPh Pasal 4 ayat (2) bersifat final dan harus disetor sesuai dengan ketentuan untuk masing-masing jenis penghasilan."
            />
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhFinalCalculator() {
  const [grossIncome, setGrossIncome] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!grossIncome) newErrors.grossIncome = 'Omzet bruto harus diisi';
    
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

  // Calculate tax
  const tax = parseFloat(grossIncome) * 0.003;
  
  // Calculate time remaining for 0.3% rate
  const getTimeRemaining = () => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    const endDate = new Date(start);
    endDate.setFullYear(endDate.getFullYear() + 4);
    
    const now = new Date();
    const remaining = endDate - now;
    
    if (remaining <= 0) return "Masa berlaku tarif PPh Final 0,3% telah habis";
    
    const daysRemaining = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const yearsRemaining = Math.floor(monthsRemaining / 12);
    
    if (yearsRemaining > 0) {
      return `${yearsRemaining} tahun ${monthsRemaining % 12} bulan tersisa`;
    } else {
      return `${monthsRemaining} bulan tersisa`;
    }
  };

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Final UMKM (0,3%)" 
        subtitle="Hitung pajak penghasilan final untuk CV yang memenuhi kriteria UMKM sesuai PP No. 55 Tahun 2022"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Data Perhitungan</h2>
            
            <form onSubmit={handleCalculate}>
              <CurrencyInput
                id="grossIncome"
                label="Omzet Bruto Bulanan"
                value={grossIncome}
                onChange={setGrossIncome}
                placeholder="Masukkan omzet bruto"
                required
                error={errors.grossIncome}
              />
              
              <div className="form-group">
                <label htmlFor="startDate" className="block mb-1 text-gray-700 font-medium">
                  Tanggal Mulai Penggunaan Tarif PPh Final
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="box-border py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Opsional: Untuk menghitung sisa masa penggunaan tarif PPh Final 0,3% (maksimal 4 tahun)
                </p>
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
                  ) : 'Hitung Pajak'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Final UMKM</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Dasar Hukum:</span> Peraturan Pemerintah (PP) No. 55 Tahun 2022
              </p>
              <p>
                <span className="font-semibold">Tarif PPh Final:</span> 0,3% dari omzet bruto
              </p>
              <p>
                <span className="font-semibold">Syarat Penggunaan:</span> CV dengan peredaran bruto ≤ Rp4,8 miliar dalam satu tahun pajak
              </p>
              <p>
                <span className="font-semibold">Masa Penggunaan:</span> Maksimal 4 tahun
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <>
              <TaxResult
                title="PPh Final UMKM"
                amount={tax}
                details={[
                  { label: 'Omzet Bruto', value: `Rp ${new Intl.NumberFormat('id-ID').format(grossIncome)}` },
                  { label: 'Tarif Pajak', value: '0,3%' },
                ]}
                note="PPh Final harus disetor paling lambat tanggal 15 bulan berikutnya."
              />
              
              {startDate && (
                <div className="card mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Masa Penggunaan Tarif PPh Final</h3>
                  <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-md">
                    <p className="font-medium">{getTimeRemaining()}</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Setelah 4 tahun, CV harus menggunakan tarif PPh Badan normal.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPhArticle22Calculator() {
  const [transactionType, setTransactionType] = useState('import');
  const [importValue, setImportValue] = useState('');
  const [purchaseValue, setPurchaseValue] = useState('');
  const [hasNPWP, setHasNPWP] = useState(true);
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (transactionType === 'import' && !importValue) {
      newErrors.importValue = 'Nilai impor harus diisi';
    }
    if (transactionType === 'purchase' && !purchaseValue) {
      newErrors.purchaseValue = 'Nilai pembelian harus diisi';
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

  // Calculate PPh 22
  const calculatePPh22 = () => {
    let taxRate = 0;
    let transactionValue = 0;
    
    if (transactionType === 'import') {
      // Import transaction
      taxRate = hasNPWP ? 0.025 : 0.05; // 2.5% with NPWP, 5% without NPWP
      transactionValue = parseFloat(importValue) || 0;
    } else {
      // Purchase transaction
      taxRate = hasNPWP ? 0.015 : 0.03; // 1.5% with NPWP, 3% without NPWP
      transactionValue = parseFloat(purchaseValue) || 0;
    }
    
    const taxAmount = transactionValue * taxRate;
    
    return {
      taxRate,
      transactionValue,
      taxAmount
    };
  };

  const taxResult = calculatePPh22();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPh Pasal 22" 
        subtitle="Hitung pajak penghasilan atas impor atau pembelian barang"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPh 22</h2>
            
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label className="block mb-1 text-gray-700 font-medium">
                  Jenis Transaksi <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="import"
                      checked={transactionType === 'import'}
                      onChange={() => setTransactionType('import')}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Impor Barang</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="purchase"
                      checked={transactionType === 'purchase'}
                      onChange={() => setTransactionType('purchase')}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Pembelian Barang</span>
                  </label>
                </div>
              </div>
              
              {transactionType === 'import' ? (
                <CurrencyInput
                  id="importValue"
                  label="Nilai Impor"
                  value={importValue}
                  onChange={setImportValue}
                  placeholder="Masukkan nilai impor"
                  required
                  error={errors.importValue}
                />
              ) : (
                <CurrencyInput
                  id="purchaseValue"
                  label="Nilai Pembelian"
                  value={purchaseValue}
                  onChange={setPurchaseValue}
                  placeholder="Masukkan nilai pembelian"
                  required
                  error={errors.purchaseValue}
                />
              )}
              
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
                  ) : 'Hitung PPh 22'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPh Pasal 22</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                PPh Pasal 22 adalah pajak yang dikenakan sehubungan dengan pembayaran atas penyerahan barang dan kegiatan di bidang impor atau kegiatan usaha di bidang lain.
              </p>
              <p>
                <span className="font-semibold">Tarif PPh Pasal 22:</span>
              </p>
              <ul className="list-disc pl-6">
                <li>Impor barang: 2,5% (dengan NPWP) atau 5% (tanpa NPWP) dari nilai impor</li>
                <li>Pembelian barang oleh instansi pemerintah: 1,5% (dengan NPWP) atau 3% (tanpa NPWP) dari harga pembelian</li>
                <li>Tarif lainnya bervariasi tergantung jenis barang dan transaksi</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <TaxResult
              title="PPh Pasal 22"
              amount={taxResult.taxAmount}
              details={[
                { 
                  label: transactionType === 'import' ? 'Nilai Impor' : 'Nilai Pembelian', 
                  value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.transactionValue)}` 
                },
                { 
                  label: 'Tarif Pajak', 
                  value: `${taxResult.taxRate * 100}%` 
                },
                { 
                  label: 'Status NPWP', 
                  value: hasNPWP ? 'Memiliki NPWP' : 'Tidak Memiliki NPWP' 
                },
              ]}
              note={transactionType === 'import' 
                ? "PPh Pasal 22 atas impor barang harus dilunasi bersamaan dengan pembayaran bea masuk."
                : "PPh Pasal 22 atas pembelian barang disetor oleh pemungut pajak."}
            />
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import PageTitle from '@/components/ui/PageTitle';
import CurrencyInput from '@/components/ui/CurrencyInput';
import TaxResult from '@/components/ui/TaxResult';

export default function PPNCalculator() {
  const [transactionType, setTransactionType] = useState('sales');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [inputTax, setInputTax] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!transactionAmount) {
      newErrors.transactionAmount = 'Nilai transaksi harus diisi';
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

  // Calculate PPN
  const calculatePPN = () => {
    const amount = parseFloat(transactionAmount) || 0;
    const ppnRate = 0.11; // Current PPN rate (11%)
    
    let ppnAmount = 0;
    let netAmount = 0;
    
    if (transactionType === 'sales') {
      // For sales, PPN is added to the transaction amount
      ppnAmount = amount * ppnRate;
      netAmount = amount + ppnAmount;
    } else if (transactionType === 'purchase') {
      // For purchases, we assume the amount includes PPN
      netAmount = amount;
      ppnAmount = amount * (ppnRate / (1 + ppnRate));
    }
    
    const inputTaxValue = parseFloat(inputTax) || 0;
    let ppnToBePaid = 0;
    
    if (transactionType === 'sales') {
      // PPN to be paid = Output tax (from sales) - Input tax (from purchases)
      ppnToBePaid = Math.max(0, ppnAmount - inputTaxValue);
    } else {
      // For purchases, the PPN can be credited
      ppnToBePaid = 0; // This is not the amount to be paid but credited
    }
    
    return {
      ppnRate,
      amount,
      ppnAmount,
      netAmount,
      ppnToBePaid
    };
  };

  const taxResult = calculatePPN();

  return (
    <div>
      <PageTitle 
        title="Kalkulator PPN" 
        subtitle="Hitung Pajak Pertambahan Nilai (PPN) untuk transaksi barang dan jasa kena pajak"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="section-title">Form Perhitungan PPN</h2>
            
            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label className="block mb-1 text-gray-700 font-medium">
                  Jenis Transaksi <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="sales"
                      checked={transactionType === 'sales'}
                      onChange={() => setTransactionType('sales')}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Penjualan (PPN Keluaran)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="purchase"
                      checked={transactionType === 'purchase'}
                      onChange={() => setTransactionType('purchase')}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Pembelian (PPN Masukan)</span>
                  </label>
                </div>
              </div>
              
              <CurrencyInput
                id="transactionAmount"
                label={transactionType === 'sales' ? "Nilai Penjualan (Dasar Pengenaan Pajak)" : "Nilai Pembelian (Termasuk PPN)"}
                value={transactionAmount}
                onChange={setTransactionAmount}
                placeholder={`Masukkan nilai ${transactionType === 'sales' ? 'penjualan' : 'pembelian'}`}
                required
                error={errors.transactionAmount}
              />
              
              {transactionType === 'sales' && (
                <CurrencyInput
                  id="inputTax"
                  label="PPN Masukan yang Dapat Dikreditkan"
                  value={inputTax}
                  onChange={setInputTax}
                  placeholder="Masukkan nilai PPN Masukan"
                />
              )}
              
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
                  ) : 'Hitung PPN'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mt-6">
            <h2 className="section-title">Informasi PPN</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Pajak Pertambahan Nilai (PPN) adalah pajak yang dikenakan atas konsumsi barang dan jasa kena pajak di dalam daerah pabean.
              </p>
              <p>
                <span className="font-semibold">Tarif PPN:</span> 11% (berlaku mulai 1 April 2022)
              </p>
              <p>
                <span className="font-semibold">PPN Keluaran:</span> PPN yang dipungut ketika PKP menjual barang/jasa kena pajak
              </p>
              <p>
                <span className="font-semibold">PPN Masukan:</span> PPN yang dibayar ketika PKP membeli barang/jasa kena pajak
              </p>
              <p>
                <span className="font-semibold">Kewajiban PKP:</span> CV wajib memungut, menyetor, dan melaporkan PPN jika omzet melebihi Rp4,8 miliar dalam satu tahun pajak atau jika CV secara sukarela meminta dikukuhkan sebagai PKP.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {isCalculated && (
            <>
              {transactionType === 'sales' ? (
                <TaxResult
                  title="PPN Keluaran (Penjualan)"
                  amount={taxResult.ppnAmount}
                  details={[
                    { 
                      label: 'Dasar Pengenaan Pajak', 
                      value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.amount)}` 
                    },
                    { 
                      label: 'Tarif PPN', 
                      value: `${taxResult.ppnRate * 100}%` 
                    },
                    { 
                      label: 'Harga Jual Termasuk PPN', 
                      value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.netAmount)}` 
                    },
                    { 
                      label: 'PPN Masukan (Kredit)', 
                      value: `Rp ${new Intl.NumberFormat('id-ID').format(inputTax || 0)}` 
                    }
                  ]}
                  note="PPN harus dipungut saat penyerahan BKP/JKP dan disetor paling lambat akhir bulan berikutnya."
                />
              ) : (
                <TaxResult
                  title="PPN Masukan (Pembelian)"
                  amount={taxResult.ppnAmount}
                  details={[
                    { 
                      label: 'Nilai Termasuk PPN', 
                      value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.amount)}` 
                    },
                    { 
                      label: 'Dasar Pengenaan Pajak', 
                      value: `Rp ${new Intl.NumberFormat('id-ID').format(taxResult.amount - taxResult.ppnAmount)}` 
                    },
                    { 
                      label: 'Tarif PPN', 
                      value: `${taxResult.ppnRate * 100}%` 
                    }
                  ]}
                  note="PPN Masukan dapat dikreditkan dengan PPN Keluaran dalam masa pajak yang sama."
                />
              )}
              
              {transactionType === 'sales' && (
                <div className="card mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">PPN yang Harus Disetor</h3>
                  <div className={`p-3 border rounded-md ${parseFloat(inputTax) > taxResult.ppnAmount ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                    <p className={`font-medium ${parseFloat(inputTax) > taxResult.ppnAmount ? 'text-yellow-800' : 'text-red-800'}`}>
                      Rp {new Intl.NumberFormat('id-ID').format(taxResult.ppnToBePaid)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    {parseFloat(inputTax) > taxResult.ppnAmount 
                      ? "PPN Masukan lebih besar dari PPN Keluaran, terdapat kelebihan PPN Masukan yang dapat dikompensasikan ke masa pajak berikutnya."
                      : "PPN yang harus disetor = PPN Keluaran - PPN Masukan yang dapat dikreditkan."
                    }
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
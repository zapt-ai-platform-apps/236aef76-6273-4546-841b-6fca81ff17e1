import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CurrencyInput from '@/components/common/CurrencyInput';
import Alert from '@/components/common/Alert';

const PPHFinalPage = () => {
  const [omzet, setOmzet] = useState('');
  const [taxResult, setTaxResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const calculateTax = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');
    
    try {
      // Remove thousand separators and convert to number
      const omzetNumber = parseFloat(omzet.replace(/\./g, '').replace(',', '.'));
      
      if (isNaN(omzetNumber)) {
        throw new Error('Mohon masukkan nilai omzet yang valid');
      }
      
      if (omzetNumber > 4800000000) {
        setTaxResult({
          omzet: omzetNumber,
          taxPercentage: 0.3,
          taxAmount: omzetNumber * 0.003,
          warning: 'Omzet lebih dari Rp4,8 miliar. CV Anda wajib menjadi PKP dan menggunakan tarif PPh badan biasa.'
        });
      } else {
        setTaxResult({
          omzet: omzetNumber,
          taxPercentage: 0.3,
          taxAmount: omzetNumber * 0.003,
          warning: null
        });
      }
    } catch (error) {
      setError(error.message);
      setTaxResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kalkulator PPh Final UMKM</h1>
      
      <div className="card mb-8">
        <div className="flex items-start mb-4">
          <InformationCircleIcon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Tarif PPh Final UMKM</h3>
            <p className="text-gray-700">
              Berdasarkan Peraturan Pemerintah (PP) No. 55 Tahun 2022, CV yang memiliki omzet sampai dengan 
              Rp4,8 miliar dalam satu tahun pajak dapat menggunakan tarif PPh Final sebesar 0,3% dari peredaran bruto.
            </p>
          </div>
        </div>
        
        <form onSubmit={calculateTax}>
          <CurrencyInput
            id="omzet"
            label="Omzet/Peredaran Bruto (dalam satu periode/tahun pajak)"
            value={omzet}
            onChange={setOmzet}
            placeholder="0"
            required={true}
            error={!!error}
            helperText={error}
          />
          
          <button 
            type="submit" 
            className="btn-primary w-full cursor-pointer"
            disabled={isCalculating || !omzet}
          >
            {isCalculating ? 'Menghitung...' : 'Hitung PPh Final'}
          </button>
        </form>
      </div>
      
      {taxResult && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan PPh Final</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Omzet/Peredaran Bruto</p>
              <p className="text-lg font-semibold">{formatCurrency(taxResult.omzet)}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Tarif PPh Final</p>
              <p className="text-lg font-semibold">{taxResult.taxPercentage}%</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">Pajak yang Harus Dibayar</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(taxResult.taxAmount)}</p>
          </div>
          
          {taxResult.warning && (
            <Alert 
              type="warning"
              title="Perhatian"
              message={taxResult.warning}
              className="mt-4"
            />
          )}
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Informasi Penting:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>PPh Final dibayarkan setiap bulan dan dilaporkan dalam SPT Masa PPh Final.</li>
              <li>Batas waktu pembayaran PPh Final adalah tanggal 15 bulan berikutnya.</li>
              <li>Batas waktu pelaporan SPT Masa PPh Final adalah tanggal 20 bulan berikutnya.</li>
              <li>PPh Final dikenakan atas penghasilan bruto (omzet) tanpa dikurangi biaya apapun.</li>
              <li>Fasilitas PPh Final 0,3% hanya dapat dimanfaatkan selama 4 tahun pajak.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PPHFinalPage;
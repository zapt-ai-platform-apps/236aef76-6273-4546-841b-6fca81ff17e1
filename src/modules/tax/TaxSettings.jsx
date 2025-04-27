import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function TaxSettings() {
  const [pphFinalStartDate, setPphFinalStartDate] = useState('2022-01-01');
  const [showAlert, setShowAlert] = useState(false);
  
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  
  // Calculate PPh Final expiry date (4 years from start date)
  const calculateExpiryDate = () => {
    if (!pphFinalStartDate) return '';
    
    const startDate = new Date(pphFinalStartDate);
    startDate.setFullYear(startDate.getFullYear() + 4);
    
    return startDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Calculate remaining months for PPh Final usage
  const calculateRemainingMonths = () => {
    if (!pphFinalStartDate) return 0;
    
    const startDate = new Date(pphFinalStartDate);
    const expiryDate = new Date(startDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 4);
    
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    return diffMonths > 0 ? diffMonths : 0;
  };
  
  const remainingMonths = calculateRemainingMonths();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Pengaturan Pajak</h1>
        <p className="mt-1 text-sm text-gray-500">Kelola preferensi dan pengaturan pajak CV Anda</p>
      </div>
      
      {showAlert && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 flex items-start">
          <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
          <p className="text-sm text-green-700">
            Pengaturan pajak berhasil disimpan!
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Pengaturan PPh Final UMKM (0.3%)</h2>
          
          <form onSubmit={handleSaveSettings}>
            <div className="mb-4">
              <label htmlFor="pphFinalStartDate" className="label">
                Tanggal Mulai Menggunakan PPh Final
              </label>
              <input
                type="date"
                id="pphFinalStartDate"
                value={pphFinalStartDate}
                onChange={(e) => setPphFinalStartDate(e.target.value)}
                className="input-field"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tanggal mulai CV Anda menggunakan tarif PPh Final UMKM (0.3%)
              </p>
            </div>
            
            <div className="mb-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-700 mb-2">Informasi Masa Berlaku</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Tanggal berakhir: <strong>{calculateExpiryDate()}</strong></li>
                <li>Sisa waktu: <strong>{remainingMonths} bulan</strong></li>
              </ul>
              
              {remainingMonths <= 6 && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-xs">
                  <strong>Perhatian:</strong> Masa penggunaan PPh Final UMKM akan segera berakhir. Setelah periode 4 tahun,
                  CV Anda harus kembali menggunakan tarif PPh Badan normal.
                </div>
              )}
            </div>
            
            <button type="submit" className="btn-primary cursor-pointer">
              Simpan Pengaturan
            </button>
          </form>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium mb-4">Preferensi Perhitungan</h2>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Gunakan pembulatan ke atas
                </span>
              </label>
              <p className="ml-6 text-xs text-gray-500">
                Hasil perhitungan pajak akan dibulatkan ke atas ke ribuan terdekat
              </p>
            </div>
            
            <div>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Tampilkan peringatan batas waktu
                </span>
              </label>
              <p className="ml-6 text-xs text-gray-500">
                Tampilkan peringatan untuk batas waktu pembayaran dan pelaporan pajak
              </p>
            </div>
            
            <div>
              <label className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Simpan riwayat perhitungan
                </span>
              </label>
              <p className="ml-6 text-xs text-gray-500">
                Simpan dan tampilkan riwayat perhitungan pajak sebelumnya
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Informasi Perpajakan</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">PPh Final UMKM (0.3%)</h3>
            <p className="text-sm text-gray-600 mt-1">
              Berdasarkan PP No. 55 Tahun 2022, tarif PPh Final untuk UKM dengan omzet sampai dengan Rp4,8 miliar per tahun
              adalah 0,3% dari omzet bruto, namun hanya dapat digunakan maksimal selama 4 tahun.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700">PPh Badan Normal</h3>
            <p className="text-sm text-gray-600 mt-1">
              Setelah masa penggunaan PPh Final berakhir, CV akan dikenai tarif PPh Badan normal sebesar 22% dari penghasilan
              kena pajak. CV juga perlu melakukan pembayaran angsuran PPh Pasal 25.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700">PPN</h3>
            <p className="text-sm text-gray-600 mt-1">
              CV dengan omzet melebihi Rp4,8 miliar per tahun wajib dikukuhkan sebagai Pengusaha Kena Pajak (PKP) dan
              memungut PPN sebesar 11% atas penyerahan Barang Kena Pajak (BKP) dan/atau Jasa Kena Pajak (JKP).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { api as taxApi } from '@/modules/tax/api';
import { PPH_23_RATES, PPH_4_AYAT_2_RATES } from '@/modules/tax/constants';

// Tax type tabs
const TAX_TYPES = [
  { id: 'pph21', label: 'PPh Pasal 21', description: 'Pajak atas penghasilan karyawan' },
  { id: 'pph22', label: 'PPh Pasal 22', description: 'Pajak atas transaksi pembelian dan impor' },
  { id: 'pph23', label: 'PPh Pasal 23', description: 'Pajak atas transaksi jasa' },
  { id: 'pph4ayat2', label: 'PPh Pasal 4(2)', description: 'Pajak penghasilan bersifat final' },
  { id: 'pph25', label: 'PPh Pasal 25', description: 'Angsuran PPh Badan' },
];

export default function PphGeneralPage() {
  const [activeTab, setActiveTab] = useState('pph21');
  const [formData, setFormData] = useState({
    // PPh 21
    employeeSalary: '',
    taxDeductions: '',
    isJKKJKMRegistered: false,
    isPensionPlanRegistered: false,
    
    // PPh 22
    transactionType: 'import',
    transactionValue: '',
    
    // PPh 23
    amount: '',
    serviceType: 'rental',
    
    // PPh 4(2)
    incomeAmount: '',
    incomeType: 'landBuildingSale',
    constructionType: 'planning',
    implementationScale: 'small',
    
    // PPh 25
    prevYearTaxAmount: '',
    fiscalLosses: '',
    pphPaid: ''
  });
  
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : 
              (name.includes('Amount') || name.includes('Value') || name.includes('Salary') || 
               name.includes('Losses') || name.includes('Paid') || name.includes('Deductions')) 
                ? value.replace(/[^0-9]/g, '') 
                : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsCalculating(true);
    
    try {
      let calculationResult;
      
      switch (activeTab) {
        case 'pph21':
          calculationResult = taxApi.calculatePph21({
            employeeSalary: parseFloat(formData.employeeSalary),
            taxDeductions: parseFloat(formData.taxDeductions) || 0,
            isJKKJKMRegistered: formData.isJKKJKMRegistered,
            isPensionPlanRegistered: formData.isPensionPlanRegistered
          });
          break;
          
        case 'pph22':
          calculationResult = taxApi.calculatePph22({
            transactionType: formData.transactionType,
            transactionValue: parseFloat(formData.transactionValue)
          });
          break;
          
        case 'pph23':
          calculationResult = taxApi.calculatePph23({
            amount: parseFloat(formData.amount),
            serviceType: formData.serviceType
          });
          break;
          
        case 'pph4ayat2':
          calculationResult = taxApi.calculatePph4Ayat2({
            amount: parseFloat(formData.incomeAmount),
            incomeType: formData.incomeType,
            constructionType: formData.constructionType,
            implementationScale: formData.implementationScale
          });
          break;
          
        case 'pph25':
          calculationResult = taxApi.calculatePph25({
            prevYearTaxAmount: parseFloat(formData.prevYearTaxAmount),
            fiscalLosses: parseFloat(formData.fiscalLosses) || 0,
            pphPaid: parseFloat(formData.pphPaid) || 0
          });
          break;
          
        default:
          throw new Error('Jenis pajak tidak valid');
      }
      
      setResult(calculationResult);
    } catch (err) {
      console.error(`Error calculating ${activeTab}:`, err);
      setError(err.message);
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
    }).format(amount || 0);
  };
  
  const renderForm = () => {
    switch (activeTab) {
      case 'pph21':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="employeeSalary" className="form-label">
                Gaji Tahunan Karyawan (Rp)
              </label>
              <input
                type="text"
                id="employeeSalary"
                name="employeeSalary"
                value={formData.employeeSalary.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 60000000"
                required
              />
            </div>
            
            <div>
              <label htmlFor="taxDeductions" className="form-label">
                Potongan Pajak Lainnya (Rp)
              </label>
              <input
                type="text"
                id="taxDeductions"
                name="taxDeductions"
                value={formData.taxDeductions.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 1000000"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isJKKJKMRegistered"
                name="isJKKJKMRegistered"
                checked={formData.isJKKJKMRegistered}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isJKKJKMRegistered" className="ml-2 text-sm text-gray-700">
                Terdaftar JKK/JKM
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPensionPlanRegistered"
                name="isPensionPlanRegistered"
                checked={formData.isPensionPlanRegistered}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isPensionPlanRegistered" className="ml-2 text-sm text-gray-700">
                Memiliki Program Pensiun
              </label>
            </div>
          </div>
        );
        
      case 'pph22':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="transactionType" className="form-label">
                Jenis Transaksi
              </label>
              <select
                id="transactionType"
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="import">Impor Barang</option>
                <option value="government">Pembayaran dari Perbendaharaan Negara</option>
                <option value="fuel">Pembelian Bahan Bakar</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="transactionValue" className="form-label">
                Nilai Transaksi (Rp)
              </label>
              <input
                type="text"
                id="transactionValue"
                name="transactionValue"
                value={formData.transactionValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 100000000"
                required
              />
            </div>
          </div>
        );
        
      case 'pph23':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="serviceType" className="form-label">
                Jenis Jasa
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="rental">Sewa Aset (selain tanah/bangunan)</option>
                <option value="technical">Jasa Teknik</option>
                <option value="management">Jasa Manajemen</option>
                <option value="consulting">Jasa Konsultan</option>
                <option value="other">Jasa Lainnya</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="amount" className="form-label">
                Nilai Transaksi (Rp)
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 50000000"
                required
              />
            </div>
          </div>
        );
        
      case 'pph4ayat2':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="incomeType" className="form-label">
                Jenis Penghasilan
              </label>
              <select
                id="incomeType"
                name="incomeType"
                value={formData.incomeType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="landBuildingSale">Penjualan Tanah/Bangunan</option>
                <option value="landBuildingRental">Sewa Tanah/Bangunan</option>
                <option value="construction">Jasa Konstruksi</option>
                <option value="bondInterest">Bunga Obligasi</option>
              </select>
            </div>
            
            {formData.incomeType === 'construction' && (
              <div>
                <label htmlFor="constructionType" className="form-label">
                  Jenis Jasa Konstruksi
                </label>
                <select
                  id="constructionType"
                  name="constructionType"
                  value={formData.constructionType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="planning">Perencanaan Konstruksi</option>
                  <option value="implementation">Pelaksanaan Konstruksi</option>
                  <option value="supervision">Pengawasan Konstruksi</option>
                </select>
              </div>
            )}
            
            {formData.incomeType === 'construction' && formData.constructionType === 'implementation' && (
              <div>
                <label htmlFor="implementationScale" className="form-label">
                  Skala Pelaksanaan
                </label>
                <select
                  id="implementationScale"
                  name="implementationScale"
                  value={formData.implementationScale}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="small">Kecil</option>
                  <option value="medium">Menengah</option>
                  <option value="large">Besar</option>
                </select>
              </div>
            )}
            
            <div>
              <label htmlFor="incomeAmount" className="form-label">
                Nilai Penghasilan (Rp)
              </label>
              <input
                type="text"
                id="incomeAmount"
                name="incomeAmount"
                value={formData.incomeAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 200000000"
                required
              />
            </div>
          </div>
        );
        
      case 'pph25':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="prevYearTaxAmount" className="form-label">
                PPh Badan Tahun Sebelumnya (Rp)
              </label>
              <input
                type="text"
                id="prevYearTaxAmount"
                name="prevYearTaxAmount"
                value={formData.prevYearTaxAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 24000000"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fiscalLosses" className="form-label">
                Kompensasi Kerugian Fiskal (Rp)
              </label>
              <input
                type="text"
                id="fiscalLosses"
                name="fiscalLosses"
                value={formData.fiscalLosses.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 5000000"
              />
            </div>
            
            <div>
              <label htmlFor="pphPaid" className="form-label">
                PPh yang Sudah Dibayar Tahun Ini (Rp)
              </label>
              <input
                type="text"
                id="pphPaid"
                name="pphPaid"
                value={formData.pphPaid.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                onChange={handleChange}
                className="form-input"
                placeholder="Contoh: 6000000"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderResult = () => {
    if (!result) return null;
    
    switch (activeTab) {
      case 'pph21':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Perhitungan PPh Pasal 21</h3>
            
            <div>
              <p className="text-sm text-gray-600">Gaji Tahunan</p>
              <p className="font-medium">{formatCurrency(result.employeeSalary)}</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Pengurang:</p>
              <ul className="space-y-1 pl-5">
                <li className="flex justify-between">
                  <span>Iuran JKK/JKM</span>
                  <span>{formatCurrency(result.deductions.jkkJkm)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Iuran Pensiun</span>
                  <span>{formatCurrency(result.deductions.pension)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Biaya Jabatan</span>
                  <span>{formatCurrency(result.deductions.occupational)}</span>
                </li>
                <li className="flex justify-between">
                  <span>PTKP</span>
                  <span>{formatCurrency(result.deductions.personal)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Lainnya</span>
                  <span>{formatCurrency(result.deductions.other)}</span>
                </li>
              </ul>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">Penghasilan Kena Pajak</p>
              <p className="font-medium">{formatCurrency(result.taxableIncome)}</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">PPh Pasal 21 Terutang</p>
              <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.taxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Gaji Bersih</p>
              <p className="font-medium">{formatCurrency(result.netSalary)}</p>
            </div>
          </div>
        );
        
      case 'pph22':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Perhitungan PPh Pasal 22</h3>
            
            <div>
              <p className="text-sm text-gray-600">Jenis Transaksi</p>
              <p className="font-medium">
                {
                  formData.transactionType === 'import' ? 'Impor Barang' :
                  formData.transactionType === 'government' ? 'Pembayaran dari Perbendaharaan Negara' :
                  'Pembelian Bahan Bakar'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Transaksi</p>
              <p className="font-medium">{formatCurrency(result.transactionValue)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Tarif PPh 22</p>
              <p className="font-medium">{(result.taxRate * 100).toFixed(1)}%</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">PPh Pasal 22 Terutang</p>
              <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.taxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Setelah Pajak</p>
              <p className="font-medium">{formatCurrency(result.netAmount)}</p>
            </div>
          </div>
        );
        
      case 'pph23':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Perhitungan PPh Pasal 23</h3>
            
            <div>
              <p className="text-sm text-gray-600">Jenis Jasa</p>
              <p className="font-medium">
                {
                  result.serviceType === 'rental' ? 'Sewa Aset (selain tanah/bangunan)' :
                  result.serviceType === 'technical' ? 'Jasa Teknik' :
                  result.serviceType === 'management' ? 'Jasa Manajemen' :
                  result.serviceType === 'consulting' ? 'Jasa Konsultan' :
                  'Jasa Lainnya'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Jasa</p>
              <p className="font-medium">{formatCurrency(result.amount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Tarif PPh 23</p>
              <p className="font-medium">{(result.taxRate * 100).toFixed(1)}%</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">PPh Pasal 23 Terutang</p>
              <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.taxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Setelah Pajak</p>
              <p className="font-medium">{formatCurrency(result.netAmount)}</p>
            </div>
          </div>
        );
        
      case 'pph4ayat2':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Perhitungan PPh Pasal 4(2)</h3>
            
            <div>
              <p className="text-sm text-gray-600">Jenis Penghasilan</p>
              <p className="font-medium">
                {
                  result.incomeType === 'landBuildingSale' ? 'Penjualan Tanah/Bangunan' :
                  result.incomeType === 'landBuildingRental' ? 'Sewa Tanah/Bangunan' :
                  result.incomeType === 'construction' ? 'Jasa Konstruksi' :
                  'Bunga Obligasi'
                }
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Penghasilan</p>
              <p className="font-medium">{formatCurrency(result.amount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Tarif PPh 4(2)</p>
              <p className="font-medium">{(result.taxRate * 100).toFixed(1)}%</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">PPh Pasal 4(2) Terutang</p>
              <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.taxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Nilai Setelah Pajak</p>
              <p className="font-medium">{formatCurrency(result.netAmount)}</p>
            </div>
          </div>
        );
        
      case 'pph25':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Perhitungan PPh Pasal 25</h3>
            
            <div>
              <p className="text-sm text-gray-600">PPh Badan Tahun Sebelumnya</p>
              <p className="font-medium">{formatCurrency(result.prevYearTaxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Kompensasi Kerugian Fiskal</p>
              <p className="font-medium">{formatCurrency(result.fiscalLosses)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Dasar Pengenaan PPh 25</p>
              <p className="font-medium">{formatCurrency(result.adjustedTaxBase)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">PPh yang Sudah Dibayar</p>
              <p className="font-medium">{formatCurrency(result.pphPaid)}</p>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <p className="text-sm text-gray-600">Sisa PPh yang Harus Diangsur</p>
              <p className="font-medium">{formatCurrency(result.remainingTaxAmount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Angsuran PPh Pasal 25 per Bulan</p>
              <p className="text-lg font-semibold text-blue-800">{formatCurrency(result.monthlyInstallment)}</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Perhitungan PPh Lainnya
        </h1>
        <p className="text-gray-600 mb-6">
          Perhitungan berbagai jenis Pajak Penghasilan (PPh) yang relevan bagi CV.
        </p>
        
        {/* Tax Type Tabs */}
        <div className="mb-6">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value);
                setResult(null);
                setError('');
              }}
              className="form-select w-full"
            >
              {TAX_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="hidden sm:block">
            <nav className="flex space-x-4">
              {TAX_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setActiveTab(type.id);
                    setResult(null);
                    setError('');
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
                    activeTab === type.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {TAX_TYPES.find(type => type.id === activeTab)?.description}
            </p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto cursor-pointer"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghitung...
                </span>
              ) : `Hitung ${TAX_TYPES.find(type => type.id === activeTab)?.label}`}
            </button>
          </div>
        </form>
      </div>
      
      {result && (
        <div className="card bg-blue-50 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">Hasil Perhitungan</h2>
          {renderResult()}
        </div>
      )}
      
      <div className="card bg-yellow-50 border border-yellow-100">
        <h3 className="text-lg font-semibold mb-3">Informasi Penting</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              PPh Pasal 21 dikenakan atas penghasilan karyawan yang dibayarkan oleh CV.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              PPh Pasal 23 dikenakan atas penghasilan dari jasa atau sewa yang dibayarkan kepada pihak ketiga.
            </span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              PPh Pasal 25 adalah angsuran pajak bulanan CV yang menggunakan tarif PPh Badan normal.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
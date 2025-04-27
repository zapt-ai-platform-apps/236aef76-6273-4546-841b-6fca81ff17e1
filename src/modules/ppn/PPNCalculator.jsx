import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiInfo } from 'react-icons/fi';
import { formatRupiah } from '../core/utils/formatCurrency';
import PPNResult from './components/PPNResult';

export default function PPNCalculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  
  const onSubmit = (data) => {
    const type = data.type;
    const amount = parseFloat(data.amount.replace(/[^\d]/g, ''));
    let base, tax;
    
    if (type === 'include') {
      // If amount includes PPN, calculate: base = amount / 1.11
      base = amount / 1.11;
      tax = amount - base;
    } else {
      // If amount excludes PPN, calculate: tax = amount * 0.11
      base = amount;
      tax = amount * 0.11;
    }
    
    setResult({
      type,
      amount,
      base: Math.round(base),
      tax: Math.round(tax),
      total: type === 'include' ? amount : amount + tax
    });
  };
  
  const formatAmountInput = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = formatRupiah(parseInt(value));
    }
    e.target.value = value;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Kalkulator PPN</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Informasi PPN</h3>
              <p className="text-blue-700 text-sm mt-1">
                CV yang telah dikukuhkan sebagai Pengusaha Kena Pajak (PKP) wajib memungut PPN sebesar 11% atas penyerahan 
                Barang Kena Pajak (BKP) dan/atau Jasa Kena Pajak (JKP). CV wajib dikukuhkan sebagai PKP jika 
                omzet melebihi Rp4,8 miliar dalam 1 tahun pajak.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Jenis Perhitungan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="border rounded-md p-4 flex items-start cursor-pointer">
                <input
                  type="radio"
                  value="exclude"
                  className="mt-1 mr-2"
                  defaultChecked
                  {...register('type', { required: true })}
                />
                <div>
                  <p className="font-medium text-gray-700">Harga Belum Termasuk PPN</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Menghitung PPN dari harga dasar, kemudian dijumlahkan.
                  </p>
                </div>
              </label>
              
              <label className="border rounded-md p-4 flex items-start cursor-pointer">
                <input
                  type="radio"
                  value="include"
                  className="mt-1 mr-2"
                  {...register('type', { required: true })}
                />
                <div>
                  <p className="font-medium text-gray-700">Harga Sudah Termasuk PPN</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Memisahkan komponen PPN dari total harga yang sudah termasuk PPN.
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Nominal
            </label>
            <input
              id="amount"
              type="text"
              className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Rp 0"
              {...register('amount', { 
                required: 'Nominal tidak boleh kosong',
                onChange: formatAmountInput
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Hitung PPN
          </button>
        </form>
      </div>
      
      {result && <PPNResult result={result} />}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Ketentuan PPN untuk CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            Pajak Pertambahan Nilai (PPN) adalah pajak yang dikenakan atas konsumsi barang dan/atau jasa kena pajak 
            di dalam Daerah Pabean. Berikut adalah ketentuan PPN untuk CV:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>CV wajib dikukuhkan sebagai Pengusaha Kena Pajak (PKP) jika omzet melebihi Rp4,8 miliar dalam 1 tahun pajak.</li>
            <li>CV dapat secara sukarela mendaftarkan diri sebagai PKP meskipun omzet belum mencapai Rp4,8 miliar.</li>
            <li>Tarif PPN saat ini adalah 11% (sesuai dengan ketentuan terbaru).</li>
            <li>PKP wajib memungut PPN atas setiap penyerahan Barang Kena Pajak (BKP) dan/atau Jasa Kena Pajak (JKP).</li>
            <li>PKP wajib membuat Faktur Pajak sebagai bukti pemungutan PPN.</li>
            <li>PKP wajib melaporkan pemungutan dan pembayaran PPN dalam SPT Masa PPN.</li>
          </ul>
          
          <p className="mt-3">
            CV yang telah dikukuhkan sebagai PKP dapat mengkreditkan PPN Masukan terhadap PPN Keluaran 
            dalam masa pajak yang sama. Selisih antara PPN Keluaran dan PPN Masukan:
          </p>
          
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Jika PPN Keluaran lebih besar dari PPN Masukan, selisihnya disetor ke kas negara.</li>
            <li>Jika PPN Masukan lebih besar dari PPN Keluaran, selisihnya dapat diminta kembali (restitusi) atau dikompensasikan ke masa pajak berikutnya.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
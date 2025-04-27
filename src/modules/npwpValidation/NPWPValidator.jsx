import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';
import { validateNPWP, formatNPWP } from '../core/utils/validators';

export default function NPWPValidator() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [validationResult, setValidationResult] = useState(null);
  
  const onSubmit = (data) => {
    const isValid = validateNPWP(data.npwp);
    setValidationResult({
      isValid,
      npwp: data.npwp
    });
  };
  
  const handleNPWPChange = (e) => {
    const formattedNPWP = formatNPWP(e.target.value);
    setValue('npwp', formattedNPWP, { shouldValidate: true });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">Validasi NPWP</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-blue-800 font-medium">Tentang Validasi NPWP</h3>
              <p className="text-blue-700 text-sm mt-1">
                Pastikan NPWP CV Anda valid dengan melakukan pengecekan format. 
                NPWP yang valid terdiri dari 15 digit dalam format XX.XXX.XXX.X-XXX.XXX.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="npwp" className="block text-gray-700 font-medium mb-2">
              Nomor NPWP
            </label>
            <input
              id="npwp"
              type="text"
              className={`input-field ${errors.npwp ? 'border-red-500' : ''}`}
              placeholder="XX.XXX.XXX.X-XXX.XXX"
              maxLength="20"
              {...register('npwp', { 
                required: 'NPWP tidak boleh kosong',
                onChange: handleNPWPChange
              })}
            />
            {errors.npwp && (
              <p className="text-red-500 text-sm mt-1">{errors.npwp.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full md:w-auto md:px-8 cursor-pointer"
          >
            Validasi NPWP
          </button>
        </form>
      </div>
      
      {validationResult && (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${validationResult.isValid ? 'border-green-500' : 'border-red-500'}`}>
          <h2 className="text-xl font-bold mb-4">Hasil Validasi</h2>
          
          <div className="flex items-center">
            {validationResult.isValid ? (
              <>
                <FiCheckCircle className="text-green-500 text-xl mr-3" />
                <div>
                  <p className="font-medium text-green-700">
                    NPWP Valid
                  </p>
                  <p className="text-gray-600 mt-1">
                    NPWP <span className="font-medium">{validationResult.npwp}</span> memiliki format yang valid.
                  </p>
                </div>
              </>
            ) : (
              <>
                <FiXCircle className="text-red-500 text-xl mr-3" />
                <div>
                  <p className="font-medium text-red-700">
                    NPWP Tidak Valid
                  </p>
                  <p className="text-gray-600 mt-1">
                    NPWP <span className="font-medium">{validationResult.npwp}</span> memiliki format yang tidak valid.
                  </p>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="italic">
              Catatan: Validasi ini hanya memeriksa format NPWP. Untuk memastikan NPWP terdaftar secara resmi, 
              silakan verifikasi melalui sistem DJP Online atau Kantor Pelayanan Pajak.
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Informasi Tentang NPWP
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            Nomor Pokok Wajib Pajak (NPWP) adalah nomor identitas yang diberikan kepada Wajib Pajak 
            sebagai sarana administrasi perpajakan. NPWP terdiri dari 15 digit dengan format XX.XXX.XXX.X-XXX.XXX.
          </p>
          
          <p className="mt-3">
            <strong>Struktur NPWP:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Digit 1-9: Kode Wajib Pajak</li>
            <li>Digit 10: Check digit</li>
            <li>Digit 11-13: Kode KPP (Kantor Pelayanan Pajak)</li>
            <li>Digit 14-15: Kode Status (00 untuk pajak pusat, 01 untuk cabang ke-1, dst)</li>
          </ul>
          
          <p className="mt-3">
            CV wajib memiliki NPWP tersendiri karena merupakan badan usaha yang terpisah dari pemiliknya. 
            NPWP digunakan untuk semua aktivitas perpajakan, termasuk pembayaran dan pelaporan pajak.
          </p>
        </div>
      </div>
    </div>
  );
}
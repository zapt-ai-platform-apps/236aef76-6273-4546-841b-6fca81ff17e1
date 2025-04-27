import React from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiDollarSign, FiPercent, FiCheckSquare } from 'react-icons/fi';
import TaxOverview from './components/TaxOverview';
import TaxMenuCard from './components/TaxMenuCard';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">
          Pajak CV KU
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Aplikasi penghitung pajak untuk CV di Indonesia berdasarkan ketentuan pajak terbaru.
          Hitung dengan mudah PPh Final, PPh 21, PPh 22, PPh 23, PPh Pasal 4(2), PPh 25, PPN, dan validasi NPWP.
        </p>
      </div>
      
      <TaxOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TaxMenuCard
          title="PPh Final UMKM (0,3%)"
          description="Hitung PPh Final sebesar 0,3% dari omzet bruto untuk CV yang memenuhi kriteria UKM berdasarkan PP No. 55 Tahun 2022."
          icon={<FiPercent className="h-8 w-8 text-teal-700" />}
          linkTo="/pph-final"
          color="bg-teal-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 21"
          description="Perhitungan pemotongan PPh atas penghasilan atau gaji karyawan CV."
          icon={<FiFileText className="h-8 w-8 text-blue-700" />}
          linkTo="/pph21"
          color="bg-blue-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 22"
          description="Pencatatan dan perhitungan PPh yang dipungut atau dipotong terkait transaksi tertentu."
          icon={<FiFileText className="h-8 w-8 text-indigo-700" />}
          linkTo="/pph22"
          color="bg-indigo-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 23"
          description="Perhitungan PPh yang dipungut atau dipotong saat bertransaksi dengan bendaharawan pemerintah atau pihak lain."
          icon={<FiFileText className="h-8 w-8 text-purple-700" />}
          linkTo="/pph23"
          color="bg-purple-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 4(2)"
          description="Perhitungan PPh final atas penghasilan dari penjualan atau penyewaan tanah dan/atau bangunan."
          icon={<FiFileText className="h-8 w-8 text-pink-700" />}
          linkTo="/pph4ayat2"
          color="bg-pink-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 25"
          description="Perhitungan angsuran PPh Pasal 25 apabila CV menggunakan tarif PPh Badan normal."
          icon={<FiFileText className="h-8 w-8 text-orange-700" />}
          linkTo="/pph25"
          color="bg-orange-50"
        />
        
        <TaxMenuCard
          title="PPN"
          description="Perhitungan PPN atas transaksi barang dan/atau jasa kena pajak untuk CV yang sudah PKP."
          icon={<FiDollarSign className="h-8 w-8 text-emerald-700" />}
          linkTo="/ppn"
          color="bg-emerald-50"
        />
        
        <TaxMenuCard
          title="PPh Pasal 24"
          description="Perhitungan potensi kredit pajak atas penghasilan yang diperoleh CV dari luar negeri."
          icon={<FiFileText className="h-8 w-8 text-cyan-700" />}
          linkTo="/pph24"
          color="bg-cyan-50"
        />
        
        <TaxMenuCard
          title="Validasi NPWP"
          description="Fitur untuk melakukan validasi Nomor Pokok Wajib Pajak (NPWP) untuk memastikan data wajib pajak akurat."
          icon={<FiCheckSquare className="h-8 w-8 text-amber-700" />}
          linkTo="/npwp-validator"
          color="bg-amber-50"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mt-8">
        <h2 className="text-xl font-bold text-teal-700 mb-4">
          Tentang Pajak CV
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>
            CV (Commanditaire Vennootschap) adalah bentuk badan usaha di Indonesia yang 
            memiliki kewajiban perpajakan tertentu. Berdasarkan Peraturan Pemerintah (PP) No. 55 Tahun 2022, 
            CV yang memenuhi kriteria UMKM dapat menggunakan tarif PPh Final sebesar 0,3% dari omzet.
          </p>
          <p className="mt-2">
            Masa penggunaan tarif PPh Final ini dibatasi maksimal 4 tahun. Setelah periode tersebut, 
            CV akan dikenakan tarif PPh Badan normal. CV juga memiliki kewajiban perpajakan lain seperti 
            PPh 21, PPh 22, PPh 23, PPh 4(2), dan PPN jika sudah menjadi Pengusaha Kena Pajak (PKP).
          </p>
        </div>
      </div>
    </div>
  );
}
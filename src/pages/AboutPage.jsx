import React from 'react';
import PageTitle from '@/components/ui/PageTitle';

export default function AboutPage() {
  return (
    <div>
      <PageTitle 
        title="Tentang Pajak CV KU" 
        subtitle="Aplikasi penghitung pajak untuk badan usaha CV di Indonesia"
      />
      
      <div className="card">
        <h2 className="section-title">Deskripsi Aplikasi</h2>
        <p className="text-gray-700 mb-4">
          Pajak CV KU adalah aplikasi yang dirancang khusus untuk membantu badan usaha berbentuk <em>Commanditaire Vennootschap</em> (CV) 
          di Indonesia dalam mengelola dan menghitung kewajiban perpajakan mereka secara otomatis sesuai dengan peraturan perpajakan terbaru.
        </p>
        <p className="text-gray-700">
          Aplikasi ini bertujuan untuk menyederhanakan proses perhitungan berbagai jenis pajak yang relevan bagi CV, 
          sehingga memudahkan pengusaha dalam memenuhi kewajiban perpajakan mereka.
        </p>
      </div>
      
      <div className="card mt-6">
        <h2 className="section-title">Fitur Utama</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Perhitungan Otomatis PPh Final UMKM</h3>
            <p className="text-gray-700">
              Aplikasi ini secara otomatis menghitung Pajak Penghasilan (PPh) Final sebesar 0,3% dari omzet bruto bagi CV yang 
              memenuhi kriteria sebagai Usaha Kecil dan Menengah (UKM) berdasarkan Peraturan Pemerintah (PP) No. 55 Tahun 2022. 
              Aplikasi ini juga memiliki kemampuan untuk memantau batas waktu penggunaan tarif PPh Final, yaitu maksimal 4 tahun.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Perhitungan PPh Lainnya</h3>
            <p className="text-gray-700">
              Aplikasi ini menyediakan fitur untuk menghitung atau memberikan estimasi secara otomatis untuk jenis pajak penghasilan 
              lainnya yang mungkin berlaku bagi CV, termasuk:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li className="text-gray-700">PPh Pasal 21: Perhitungan pemotongan PPh atas penghasilan atau gaji karyawan.</li>
              <li className="text-gray-700">PPh Pasal 22: Pencatatan dan perhitungan PPh yang dipungut atau dipotong terkait transaksi tertentu.</li>
              <li className="text-gray-700">PPh Pasal 23: Perhitungan PPh yang dipungut atau dipotong saat bertransaksi dengan bendaharawan pemerintah atau pihak lain.</li>
              <li className="text-gray-700">PPh Pasal 4 ayat (2): Perhitungan PPh final atas penghasilan dari penjualan atau penyewaan tanah dan/atau bangunan.</li>
              <li className="text-gray-700">PPh Pasal 25: Perhitungan angsuran PPh Pasal 25 apabila CV menggunakan tarif PPh Badan normal setelah melewati masa penggunaan PPh Final.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Perhitungan PPN</h3>
            <p className="text-gray-700">
              Bagi CV yang telah dikukuhkan sebagai Pengusaha Kena Pajak (PKP) karena omzet melebihi Rp4,8 miliar atau pengajuan sukarela, 
              aplikasi ini memiliki kemampuan untuk menghitung Pajak Pertambahan Nilai (PPN) atas transaksi barang dan/atau jasa kena pajak.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Perhitungan Potensi Pengkreditan PPh Pasal 24</h3>
            <p className="text-gray-700">
              Aplikasi ini dapat membantu menghitung potensi kredit pajak atas penghasilan yang diperoleh CV dari luar negeri yang telah dipotong pajaknya di sana.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800">Validasi NPWP</h3>
            <p className="text-gray-700">
              Fitur untuk melakukan validasi Nomor Pokok Wajib Pajak (NPWP) untuk memastikan data wajib pajak akurat.
            </p>
          </div>
        </div>
      </div>
      
      <div className="card mt-6">
        <h2 className="section-title">Disclaimer</h2>
        <p className="text-gray-700">
          Aplikasi ini bertujuan hanya sebagai alat bantu perhitungan dan informasi. 
          Pengguna disarankan tetap merujuk pada aturan perpajakan terbaru dan berkonsultasi dengan konsultan pajak 
          untuk mendapatkan kepastian mengenai kewajiban perpajakan mereka.
        </p>
      </div>
    </div>
  );
}
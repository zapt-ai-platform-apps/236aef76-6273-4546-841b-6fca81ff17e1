import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '@/components/ui/PageTitle';
import { 
  CalculatorIcon, 
  DocumentCheckIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const taxTypes = [
    {
      id: 'pph-final',
      title: 'PPh Final UMKM (0,3%)',
      description: 'Hitung pajak penghasilan final untuk Usaha Kecil dan Menengah dengan tarif 0,3% dari omzet bruto.',
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'pph-21',
      title: 'PPh Pasal 21',
      description: 'Hitung pajak penghasilan atas gaji, upah, dan tunjangan karyawan.',
      icon: <BuildingOfficeIcon className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'pph-22',
      title: 'PPh Pasal 22',
      description: 'Hitung pajak penghasilan atas transaksi pembelian barang tertentu.',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'pph-23',
      title: 'PPh Pasal 23',
      description: 'Hitung pajak penghasilan atas dividen, bunga, royalti, dan jasa.',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'pph-4-2',
      title: 'PPh Pasal 4(2)',
      description: 'Hitung pajak penghasilan final atas sewa tanah/bangunan, jasa konstruksi, dll.',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'pph-25',
      title: 'PPh Pasal 25',
      description: 'Hitung angsuran pajak penghasilan badan usaha.',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-red-500'
    },
    {
      id: 'ppn',
      title: 'PPN',
      description: 'Hitung Pajak Pertambahan Nilai untuk Pengusaha Kena Pajak (PKP).',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-teal-500'
    },
    {
      id: 'pph-24',
      title: 'PPh Pasal 24',
      description: 'Hitung kredit pajak atas penghasilan dari luar negeri.',
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: 'bg-pink-500'
    },
    {
      id: 'npwp-validator',
      title: 'Validasi NPWP',
      description: 'Validasi format dan keabsahan Nomor Pokok Wajib Pajak.',
      icon: <DocumentCheckIcon className="h-6 w-6" />,
      color: 'bg-gray-500'
    }
  ];

  return (
    <div>
      <PageTitle 
        title="Pajak CV KU" 
        subtitle="Aplikasi penghitung pajak untuk badan usaha CV di Indonesia"
      />

      <div className="card mb-6">
        <h2 className="section-title">Selamat Datang di Pajak CV KU</h2>
        <p className="text-gray-600 mb-4">
          Aplikasi ini dirancang untuk membantu badan usaha CV dalam mengelola dan menghitung kewajiban perpajakan 
          secara otomatis sesuai dengan peraturan perpajakan terbaru di Indonesia.
        </p>
        <p className="text-gray-600">
          Pilih jenis pajak yang ingin Anda hitung dari menu di bawah atau di sidebar.
        </p>
      </div>

      <h2 className="section-title mt-8">Kalkulator Pajak</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taxTypes.map((tax) => (
          <Link to={`/${tax.id}`} key={tax.id} className="block">
            <div className="card h-full hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-md ${tax.color} text-white mr-3`}>
                  {tax.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{tax.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{tax.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
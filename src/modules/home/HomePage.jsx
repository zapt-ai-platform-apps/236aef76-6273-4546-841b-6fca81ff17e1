import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalculatorIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  IdentificationIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';
import FeatureCard from './components/FeatureCard';

const HomePage = () => {
  const features = [
    {
      title: 'PPh Final UMKM',
      description: 'Hitung PPh Final 0,3% untuk UMKM secara otomatis sesuai PP No. 55 Tahun 2022',
      icon: <CalculatorIcon className="w-10 h-10 text-blue-500" />,
      link: '/pph-final'
    },
    {
      title: 'PPh Pasal 21',
      description: 'Hitung PPh atas penghasilan karyawan dan tenaga ahli',
      icon: <BanknotesIcon className="w-10 h-10 text-green-500" />,
      link: '/pph-pasal-21'
    },
    {
      title: 'PPh Pasal 22',
      description: 'Hitung PPh atas transaksi pembelian barang',
      icon: <DocumentTextIcon className="w-10 h-10 text-purple-500" />,
      link: '/pph-pasal-22'
    },
    {
      title: 'PPh Pasal 23',
      description: 'Hitung PPh atas penghasilan dari jasa dan sewa',
      icon: <BuildingOfficeIcon className="w-10 h-10 text-yellow-500" />,
      link: '/pph-pasal-23'
    },
    {
      title: 'PPh Pasal 4 Ayat 2',
      description: 'Hitung PPh final atas sewa tanah/bangunan dan penghasilan tertentu',
      icon: <CurrencyDollarIcon className="w-10 h-10 text-red-500" />,
      link: '/pph-pasal-4-ayat-2'
    },
    {
      title: 'PPh Pasal 25',
      description: 'Hitung angsuran PPh badan untuk CV',
      icon: <ClockIcon className="w-10 h-10 text-teal-500" />,
      link: '/pph-pasal-25'
    },
    {
      title: 'PPN',
      description: 'Hitung Pajak Pertambahan Nilai untuk transaksi barang dan jasa',
      icon: <CurrencyDollarIcon className="w-10 h-10 text-indigo-500" />,
      link: '/ppn'
    },
    {
      title: 'PPh Pasal 24',
      description: 'Hitung kredit pajak luar negeri',
      icon: <GlobeAsiaAustraliaIcon className="w-10 h-10 text-blue-500" />,
      link: '/pph-pasal-24'
    },
    {
      title: 'Validasi NPWP',
      description: 'Validasi format Nomor Pokok Wajib Pajak (NPWP)',
      icon: <IdentificationIcon className="w-10 h-10 text-gray-500" />,
      link: '/validasi-npwp'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 px-4 rounded-xl mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Pajak CV KU</h1>
          <p className="text-xl mb-8">
            Aplikasi penghitung pajak untuk Commanditaire Vennootschap (CV) di Indonesia 
            sesuai dengan peraturan perpajakan terbaru.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/pph-final" className="btn bg-white text-blue-600 hover:bg-blue-50 font-medium cursor-pointer">
              Mulai Hitung PPh Final
            </Link>
            <a 
              href="#fitur" 
              className="btn bg-blue-700 text-white hover:bg-blue-800 font-medium cursor-pointer"
            >
              Lihat Semua Fitur
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Fitur Aplikasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="card mb-12">
        <h2 className="text-2xl font-bold mb-4">Tentang Pajak CV KU</h2>
        <p className="mb-4">
          Aplikasi ini dirancang untuk membantu badan usaha berbentuk Commanditaire Vennootschap (CV) 
          di Indonesia dalam mengelola dan menghitung kewajiban perpajakan mereka secara otomatis 
          sesuai dengan peraturan yang berlaku.
        </p>
        <p className="mb-4">
          Dengan fitur-fitur otomatis ini, aplikasi ini bertujuan untuk mempermudah pengusaha CV 
          dalam memahami dan memenuhi berbagai kewajiban perpajakan mereka sesuai dengan ketentuan yang berlaku. 
          Aplikasi ini membantu dalam menghitung pajak secara efisien, sehingga mengurangi potensi kesalahan 
          perhitungan dan memastikan kepatuhan terhadap peraturan perpajakan di Indonesia.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
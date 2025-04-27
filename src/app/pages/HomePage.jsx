import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'PPh Final UMKM',
    description: 'Perhitungan otomatis PPh Final sebesar 0,3% dari omzet bruto bagi CV yang memenuhi kriteria UMKM.',
    icon: 'receipt',
    path: '/pph-final',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'PPh Lainnya',
    description: 'Estimasi perhitungan PPh Pasal 21, 22, 23, 4(2), dan 25 yang berlaku bagi CV.',
    icon: 'document-text',
    path: '/pph-general',
    color: 'bg-green-100 text-green-700',
  },
  {
    title: 'PPN',
    description: 'Perhitungan otomatis PPN bagi CV yang telah menjadi Pengusaha Kena Pajak (PKP).',
    icon: 'cash',
    path: '/ppn',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    title: 'PPh Pasal 24',
    description: 'Perhitungan potensi pengkreditan PPh Pasal 24 atas penghasilan dari luar negeri.',
    icon: 'globe',
    path: '/pph24',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    title: 'Validasi NPWP',
    description: 'Fitur untuk melakukan validasi NPWP untuk memastikan data wajib pajak akurat.',
    icon: 'identification',
    path: '/npwp-validation',
    color: 'bg-red-100 text-red-700',
  },
];

const iconComponents = {
  receipt: (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  'document-text': (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  cash: (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  globe: (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  identification: (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Pajak CV KU
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Aplikasi penghitung pajak untuk badan usaha berbentuk <em>Commanditaire Vennootschap</em> (CV) 
          di Indonesia sesuai dengan ketentuan perpajakan terbaru.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.path}
              className="card hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className={`p-4 rounded-full inline-flex ${feature.color} mb-4`}>
                {iconComponents[feature.icon]('h-6 w-6')}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                Mulai
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card mt-12 bg-blue-50 border border-blue-100">
        <h2 className="text-xl font-semibold mb-3">Kenapa Menggunakan Pajak CV KU?</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Perhitungan otomatis sesuai peraturan terbaru</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Memantau batas waktu penggunaan tarif PPh Final (maksimal 4 tahun)</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Menghitung berbagai jenis pajak yang relevan bagi CV</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Validasi NPWP untuk memastikan data wajib pajak akurat</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
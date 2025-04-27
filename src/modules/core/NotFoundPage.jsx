import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak tersedia.
      </p>
      <Link 
        to="/" 
        className="btn-primary cursor-pointer"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;